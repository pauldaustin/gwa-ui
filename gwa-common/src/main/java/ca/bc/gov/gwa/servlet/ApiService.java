package ca.bc.gov.gwa.servlet;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.conn.HttpHostConnectException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.http.HttpStatusException;
import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.util.Json;

@WebListener
public class ApiService implements ServletContextListener {

  private static final String BCGOV_GWA_ENDPOINT = "bcgov-gwa-endpoint";

  private static final List<String> APIS_FIELD_NAMES_OLD = Arrays.asList("id", "name",
    "request_host", "request_path", "strip_request_path", "preserve_host", "created_at",
    "upstream_url");

  private static final List<String> APIS_FIELD_NAMES = Arrays.asList("id", "created_at",
    "upstream_url", "preserve_host", "name", "hosts", "uris", "methods", "strip_uri", "retries",
    "upstream_connect_timeout", "upstream_send_timeout", "upstream_read_timeout", "https_only",
    "http_if_terminated");

  private static final List<String> ENDPOINT_FIELD_NAMES = Arrays.asList("name", "uri_template",
    "created_by", "upstream_url", "upstream_username", "upstream_password");

  private static final List<String> ENDPOINT_RATE_LIMIT_FIELD_NAMES = Arrays.asList("second",
    "hour", "minute", "day", "month", "year");

  public static final List<String> PLUGIN_FIELD_NAMES = Arrays.asList("id", "name", "config");

  private static ApiService instance;

  private static final Encoder BASE_64_ENCODER = Base64.getEncoder();

  private static final String DELETED = "deleted";

  private static final String UPDATED = "updated";

  private static final AtomicInteger referenceCount = new AtomicInteger();

  public static ApiService get() {
    referenceCount.incrementAndGet();
    return instance;
  }

  public static ApiService release() {
    if (referenceCount.decrementAndGet() == 0) {
      instance.close();
      instance = null;
    }
    return null;
  }

  private String kongAdminUrl = "http://localhost:8001";

  private String appsSuffix = ".apps.revolsys.com";

  private String apisSuffix = ".apis.revolsys.com";

  private String unavailableUrl = "http://major.dev.revolsys.com/gwa/error/503";

  private Map<String, Object> config = Collections.emptyMap();

  private String version;

  public ApiService() {
  }

  @SuppressWarnings("unchecked")
  public Set<String> aclGet(final String userId, final String name) throws IOException {
    final Set<String> roles = new TreeSet<>();
    try (
      JsonHttpClient httpClient = newKongClient()) {
      final Map<String, Object> consumerResponse = httpClient
        .get("/consumers/?custom_id=" + userId);
      final List<Map<String, Object>> consumers = (List<Map<String, Object>>)consumerResponse
        .get("data");
      String id = null;
      if (consumers != null && consumers.size() > 0) {
        final Map<String, Object> consumer = consumers.get(0);
        id = (String)consumer.get("id");
      }

      {
        final Map<String, Object> consumerRequest = new HashMap<>();
        consumerRequest.put("custom_id", userId);
        consumerRequest.put("username", name);
        if (id == null) {
          final Map<String, Object> consumerUpdateResponse = httpClient.put("/consumers",
            consumerRequest);
          id = (String)consumerUpdateResponse.get("id");
        } else {
          httpClient.patch("/consumers/" + id, consumerRequest);
        }
      }

      final Map<String, Object> aclsResponse = httpClient.get("/consumers/" + id + "/acls");
      final List<Map<String, Object>> roleList = (List<Map<String, Object>>)aclsResponse
        .get("data");
      if (roleList != null) {
        for (final Map<String, Object> roleMap : roleList) {
          final String role = (String)roleMap.get("group");
          roles.add(role);
        }
      }
    }
    return roles;
  }

  private void addData(final Map<String, Object> data, final Map<String, Object> requestData,
    final List<String> fieldNames) {
    for (final String key : fieldNames) {
      if (requestData.containsKey(key)) {
        final Object value = requestData.get(key);
        if (value == null) {
          data.remove(key);
        } else {
          data.put(key, value);
        }
      }
    }
  }

  public void apiGet(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse,
    final String apiName) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> apiResponse = httpClient.get("/apis/" + apiName);
      final String apiId = (String)apiResponse.get("id");
      if (apiId == null) {
        httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
      } else {
        final Map<String, Object> pluginsResponse = httpClient.get("/apis/" + apiId + "/plugins");
        @SuppressWarnings("unchecked")
        final List<Map<String, Object>> plugins = (List<Map<String, Object>>)pluginsResponse
          .get("data");
        apiResponse.put("plugins", plugins);
        Json.writeJson(httpResponse, apiResponse);
      }
    });
  }

  public void close() {

  }

  @Override
  public void contextDestroyed(final ServletContextEvent event) {
    if (instance == this) {
      instance = null;
    }
    close();
  }

  @Override
  public void contextInitialized(final ServletContextEvent event) {
    try {
      final File file = new File("/apps/config/gwa/gwa.json");
      if (file.exists()) {
        try (
          Reader configReader = new FileReader(file)) {
          this.config = Json.read(configReader);
          // final String databaseHost = (String)this.config.getOrDefault("databaseHost",
          // "localhost");
          // final int databasePort = ((Number)this.config.getOrDefault("databasePort", 9042))
          // .intValue();
          // this.node = Cluster.builder()//
          // .addContactPoint(databaseHost)//
          // .withPort(databasePort)
          // .build();

        } catch (final FileNotFoundException e) {
          logError("Unable to find configuration File: " + file, e);
        } catch (final IOException e) {
          logError("Error reading configuration File: " + file, e);
        }
      } else {

      }
      this.kongAdminUrl = getConfig("gwaKongAdminUrl", this.kongAdminUrl);
      this.appsSuffix = getConfig("gwaAppsSuffix", this.appsSuffix);
      this.apisSuffix = getConfig("gwaApisSuffix", this.apisSuffix);
      this.unavailableUrl = getConfig("gwaUnavailableUrl", this.unavailableUrl);

      // final Metadata nodeMetadata = this.node.getMetadata();
      // final KeyspaceMetadata gwa = nodeMetadata.getKeyspace("gwa");
      // this.apiTable = gwa.getTable("api");
      // for (final ColumnMetadata column : this.apiTable.getColumns()) {
      // final String fieldName = column.getName();
      // if (!"id".equals(fieldName)) {
      // this.apiFieldNames.add(fieldName);
      // }
      // }
      // this.session = this.node.connect();
      instance = this;
    } catch (final RuntimeException e) {
      LoggerFactory.getLogger(getClass()).error("Unable to initialize service", e);
      throw e;
    }
  }

  public void endpointAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String userId) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> apiRequest = new LinkedHashMap<>();
      final List<Map<String, Object>> pluginRequests = new ArrayList<>();

      if (endPointSetKongParameters(httpRequest, httpResponse, userId, apiRequest,
        pluginRequests)) {
        final Map<String, Object> apiResponse = httpClient.post("/apis", apiRequest);
        final String id = (String)apiResponse.get("id");
        if (id != null) {
          final String pluginPath = "/apis/" + id + "/plugins";
          for (final Map<String, Object> pluginRequest : pluginRequests) {
            pluginRequest.remove("id");
            httpClient.post(pluginPath, pluginRequest);
            // TODO error handling
          }
        }
        Json.writeJson(httpResponse, apiResponse);
      }
    });
  }

  @SuppressWarnings("unchecked")
  public void endpointDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String endpointId) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final String endpointPath = "/plugins" + endpointId;
      try {
        final Map<String, Object> endpoint = httpClient.get(endpointPath);
        final String apiId = (String)endpoint.get("api_id");
        final Map<String, Object> endpointConfig = (Map<String, Object>)endpoint.get("config");
        final BasePrincipal principal = (BasePrincipal)httpRequest.getUserPrincipal();
        final String userId = principal.getName();
        final String endpointUserId = (String)endpointConfig.get("created_by");
        if (principal.isUserInRole("GWA_ADMIN") || userId.equals(endpointUserId)) {
          final String apiDeletePath = "/apis/" + apiId;
          httpClient.delete(apiDeletePath);
          writeJsonResponse(httpResponse, DELETED);
        } else {
          writeJsonError(httpResponse, "You do not have permission to delete endpoint");
        }
      } catch (final HttpStatusException e) {
        if (e.getCode() == 404) {
          writeJsonResponse(httpResponse, DELETED);
        } else {
          throw e;
        }
      }
    });
  }

  @SuppressWarnings("unchecked")
  private boolean endPointSetKongParameters(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String userId,
    final Map<String, Object> apiRequest, final List<Map<String, Object>> pluginRequests)
    throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      writeJsonError(httpResponse, "Missing JSON request body");
      return false;
    } else {
      final List<String> apiFieldNames = getApiFieldNames();
      addData(apiRequest, requestData, apiFieldNames);

      final List<Map<String, Object>> plugins = (List<Map<String, Object>>)requestData
        .get("plugins");
      for (final Map<String, Object> plugin : plugins) {
        final String pluginName = (String)plugin.get("name");
        Map<String, Object> pluginConfig = null;
        if (pluginName.equals(BCGOV_GWA_ENDPOINT)) {
          pluginConfig = endPointSetPluginEndpoint(plugin, apiRequest, userId);
        } else if (pluginName.equals("rate-limiting")) {
          pluginConfig = endPointSetPluginRateLimiting(plugin);
        }
        if (pluginConfig != null) {
          final Map<String, Object> pluginRequest = new LinkedHashMap<>();
          final String id = (String)plugin.get("id");
          pluginRequest.put("id", id);
          pluginRequest.put("name", pluginName);
          pluginRequest.put("config", pluginConfig);
          pluginRequests.add(pluginRequest);
        }
      }
      return true;
    }
  }

  protected Map<String, Object> endPointSetPluginEndpoint(final Map<String, Object> plugin,
    final Map<String, Object> apiRequest, final String userId) {
    Map<String, Object> pluginConfig;
    pluginConfig = new LinkedHashMap<>();
    @SuppressWarnings("unchecked")
    final Map<String, Object> config = (Map<String, Object>)plugin.get("config");
    addData(pluginConfig, config, ENDPOINT_FIELD_NAMES);
    addData(pluginConfig, apiRequest, ENDPOINT_FIELD_NAMES);
    pluginConfig.put("created_by", userId);

    final String uriTemplate = (String)pluginConfig.get("uri_template");
    final String endpointName = (String)apiRequest.get("name");
    final String uri = uriTemplate.replace("{name}", endpointName);
    final int index1 = uri.indexOf("//");
    final int index2 = uri.indexOf("/", index1 + 2);
    String host;
    if (index2 == -1) {
      host = uri.substring(index1 + 2);
    } else {
      host = uri.substring(index1 + 2, index2);
      final String uriPrefix = uri.substring(index2);
      if (uriPrefix.length() > 1) {
        final List<String> uris = Arrays.asList(uriPrefix);
        apiRequest.put("uris", uris);
      }
    }
    final List<String> hosts = Arrays.asList(host);
    apiRequest.put("hosts", hosts);
    return pluginConfig;
  }

  protected Map<String, Object> endPointSetPluginRateLimiting(final Map<String, Object> plugin) {
    Map<String, Object> pluginConfig;
    pluginConfig = new LinkedHashMap<>();
    @SuppressWarnings("unchecked")
    final Map<String, Object> config = (Map<String, Object>)plugin.get("config");
    addData(pluginConfig, config, ENDPOINT_RATE_LIMIT_FIELD_NAMES);
    pluginConfig.put("limit_by", "consumer");
    return pluginConfig;
  }

  public void endpointUpdate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String userId) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> apiRequest = new LinkedHashMap<>();
      final List<Map<String, Object>> pluginRequests = new ArrayList<>();

      if (endPointSetKongParameters(httpRequest, httpResponse, userId, apiRequest,
        pluginRequests)) {
        final String apiId = (String)apiRequest.remove("id");
        final String apiPath = "/apis/" + apiId;
        final Map<String, Object> apiResponse = httpClient.patch(apiPath, apiRequest);
        if (apiId != null) {
          for (final Map<String, Object> pluginRequest : pluginRequests) {
            final String pluginId = (String)pluginRequest.remove("id");
            if (pluginId == null) {
              final String pluginPath = apiPath + "/plugins";
              httpClient.post(pluginPath, pluginRequest);
            } else {
              final String pluginPath = apiPath + "/plugins/" + pluginId;
              httpClient.patch(pluginPath, pluginRequest);
            }
            // TODO error handling
          }
        }
        Json.writeJson(httpResponse, apiResponse);
      }
    });
  }

  public List<String> getApiFieldNames() {
    final String version = getVersion();
    if (version.startsWith("0.9")) {
      return APIS_FIELD_NAMES_OLD;
    } else {
      return APIS_FIELD_NAMES;
    }
  }

  public String getConfig(final String name) {
    return getConfig(name, null);
  }

  public String getConfig(final String name, final String defaultValue) {
    String value = null;
    value = System.getProperty(name);
    if (value == null) {
      value = (String)this.config.get(name);
    }
    if (value == null) {
      return defaultValue;
    } else {
      return value;
    }
  }

  private Map<String, Object> getMap(final Map<String, Object> requestData,
    final List<String> fieldNames) {
    final Map<String, Object> data = new LinkedHashMap<>();
    addData(data, requestData, fieldNames);
    return data;
  }

  public String getVersion() {
    if (this.version == null) {
      try (
        JsonHttpClient httpClient = newKongClient()) {
        final Map<String, Object> kongResponse = httpClient.get("");
        this.version = (String)kongResponse.get("version");

      } catch (final Throwable e) {
        return "0.9.x";
      }
    }
    return this.version;
  }

  public void getVersion(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) throws IOException {
    final String version = getVersion();
    final Map<String, Object> response = Collections.singletonMap("version", version);
    Json.writeJson(httpResponse, response);
  }

  public void handleAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData != null) {
      handleRequest(httpRequest, httpResponse, (httpClient) -> {
        final Map<String, Object> apiResponse = httpClient.post(path, requestData);
        Json.writeJson(httpResponse, apiResponse);
      });
    }
  }

  public void handleAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path, final List<String> fieldNames)
    throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData != null) {
      handleRequest(httpRequest, httpResponse, (httpClient) -> {
        final Map<String, Object> insertData = getMap(requestData, fieldNames);
        final Map<String, Object> apiResponse = httpClient.post(path, insertData);
        Json.writeJson(httpResponse, apiResponse);
      });
    }
  }

  public void handleDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      httpClient.delete(path);
      writeJsonResponse(httpResponse, DELETED);
    });
  }

  public void handleGet(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> kongResponse = httpClient.get(path);
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public void handleList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final String limit = httpRequest.getParameter("limit");
      final StringBuilder url = new StringBuilder(this.kongAdminUrl);
      url.append(path);
      if (path.indexOf('?') == -1) {
        url.append('?');
      } else {
        url.append('&');
      }
      url.append("size=");
      url.append(limit);
      final String offset = httpRequest.getParameter("offset");
      int offsetPage = 0;
      if (offset != null) {
        try {
          offsetPage = Integer.parseInt(offset);
        } catch (final Throwable e) {
        }
      }
      final String filterFieldName = httpRequest.getParameter("filterFieldName");
      final String filterValue = httpRequest.getParameter("filterValue");
      if (filterFieldName != null && filterValue != null) {
        url.append('&');
        url.append(filterFieldName);
        url.append('=');
        url.append(filterValue);
      }
      Map<String, Object> kongResponse = Collections.emptyMap();
      String urlString = url.toString();
      do {
        kongResponse = httpClient.getByUrl(urlString);
        urlString = (String)kongResponse.remove("next");
      } while (url != null && offsetPage-- > 0);
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public void handleRequest(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final JsonHttpConsumer action) throws IOException {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      action.accept(httpClient);
    } catch (final HttpStatusException e) {
      if (e.getCode() == 503) {
        writeJsonError(httpResponse, "Kong server not available", e);
      } else {
        writeJsonError(httpResponse, "Kong server returned an error");
      }
    } catch (final HttpHostConnectException e) {
      writeJsonError(httpResponse, "Kong server not available");
    } catch (final Throwable e) {
      writeJsonError(httpResponse, "Unknown application error", e);
    }
  }

  public void handleUpdatePatch(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path, final List<String> fieldNames)
    throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {

      final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
      if (requestData == null) {
        httpResponse.sendError(HttpServletResponse.SC_BAD_REQUEST);
      } else {
        final Map<String, Object> updateData = getMap(requestData, fieldNames);
        httpClient.patch(path, updateData);
        writeJsonResponse(httpResponse, UPDATED);
      }
    });
  }

  // private void kongPluginRequestTransformer(final JsonHttpClient httpClient, final Row row,
  // final String apiId) throws IOException {
  // final Map<String, Object> config = new LinkedHashMap<>();
  // final Map<String, Object> add = new LinkedHashMap<>();
  // final List<String> headers = new ArrayList<>();
  //
  // final String upstreamUsername = row.getString("upstream_username");
  // final String upstreamPassword = row.getString("upstream_password");
  // if (upstreamUsername != null) {
  // String userAndPassword;
  // if (upstreamPassword == null) {
  // userAndPassword = upstreamUsername + ":";
  // } else {
  // userAndPassword = upstreamUsername + ":" + upstreamPassword;
  // }
  // final byte[] userAndPasswordBytes = userAndPassword.getBytes();
  // final String authorization = "Authorization:Basic "
  // + BASE_64_ENCODER.encodeToString(userAndPasswordBytes);
  // headers.add(authorization);
  // }
  // if (!headers.isEmpty()) {
  // add.put("headers", headers);
  // }
  // if (!add.isEmpty()) {
  // config.put("add", add);
  // }
  // if (!config.isEmpty()) {
  // final Map<String, Object> requestTransformations = new LinkedHashMap<>();
  // requestTransformations.put("name", "request-transformer");
  // requestTransformations.put("config", config);
  // final String path = "/apis/" + apiId + "/plugins";
  // httpClient.post(path, requestTransformations);
  // }
  // }

  public void logError(final String message, final Throwable e) {
    final Class<?> clazz = getClass();
    final Logger logger = LoggerFactory.getLogger(clazz);
    logger.error(message, e);
  }

  public JsonHttpClient newKongClient() {
    return new JsonHttpClient(this.kongAdminUrl);
  }

  @SuppressWarnings("unchecked")
  public void pluginList(final HttpServletResponse httpResponse) throws IOException {
    handleRequest(null, httpResponse, (httpClient) -> {
      final Map<String, Object> pluginResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = (List<String>)pluginResponse.get("enabled_plugins");
      Collections.sort(pluginNames);
      Json.writeJson(httpResponse, pluginResponse);
    });
  }

  public void writeInserted(final HttpServletResponse httpResponse, final String id)
    throws IOException {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"data\":{\"inserted\": true,\"id\":\"");
      writer.print(id);
      writer.println("\"}}");
    }
  }

  public void writeJsonError(final HttpServletResponse httpResponse, final String message)
    throws IOException {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"error\":\"");
      writer.print(message);
      writer.println("\"}");
    }
  }

  public void writeJsonError(final HttpServletResponse httpResponse, final String message,
    final Throwable e) throws IOException {
    LoggerFactory.getLogger(getClass()).error(message, e);
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"error\":\"");
      writer.print(message);
      writer.println("\"}");
    }
  }

  public void writeJsonResponse(final HttpServletResponse httpResponse, final String field)
    throws IOException {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"");
      writer.print(field);
      writer.println("\": true}");
    }
  }
}
