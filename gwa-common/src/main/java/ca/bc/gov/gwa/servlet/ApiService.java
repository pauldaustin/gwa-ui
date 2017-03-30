package ca.bc.gov.gwa.servlet;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Predicate;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.conn.HttpHostConnectException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.http.HttpStatusException;
import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.util.Json;
import ca.bc.gov.gwa.util.LruMap;

@WebListener
public class ApiService implements ServletContextListener {

  private static final List<String> API_SORT_FIELDS = Arrays.asList("api_name", "name",
    "consumer_username");

  private static final String BCGOV_GWA_ENDPOINT = "bcgov-gwa-endpoint";

  public static final List<String> APIS_FIELD_NAMES = Arrays.asList("id", "created_at",
    "upstream_url", "preserve_host", "name", "hosts", "uris", "methods", "strip_uri", "retries",
    "upstream_connect_timeout", "upstream_send_timeout", "upstream_read_timeout", "https_only",
    "http_if_terminated");

  private static final List<String> ENDPOINT_FIELD_NAMES = Arrays.asList("name", "uri_template",
    "created_by", "upstream_url");

  private static final List<String> ENDPOINT_RATE_LIMIT_FIELD_NAMES = Arrays.asList("second",
    "hour", "minute", "day", "month", "year");

  public static final List<String> PLUGIN_FIELD_NAMES = Arrays.asList("id", "name", "config");

  private static ApiService instance;

  private static final String DELETED = "deleted";

  private static final String UPDATED = "updated";

  private static final AtomicInteger referenceCount = new AtomicInteger();

  private static final Comparator<Map<String, Object>> PLUGIN_COMPARATOR = (row1, row2) -> {
    for (final String fieldName : API_SORT_FIELDS) {
      @SuppressWarnings("unchecked")
      final Comparable<Object> value1 = (Comparable<Object>)row1.get(fieldName);
      final Object value2 = row2.get(fieldName);
      if (value1 == null) {
        if (value2 != null) {
          return 1;
        }
      } else {
        if (value2 == null) {
          return -1;
        } else {
          final int compare = value1.compareTo(value2);
          if (compare != 0) {
            return compare;
          }
        }
      }
    }
    return 0;
  };

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

  private final Map<String, String> usernameByConsumerId = new LruMap<>(1000);

  private final Map<String, String> apiNameById = new LruMap<>(1000);

  private final Map<String, Map<String, Map<String, Object>>> objectByTypeAndId = new HashMap<>();

  public ApiService() {
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

  public void apiAdd(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse)
    throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData != null) {
      handleRequest(httpRequest, httpResponse, (httpClient) -> {
        final Map<String, Object> apiRequest = getMap(requestData, APIS_FIELD_NAMES);
        final Map<String, Object> apiResponse = httpClient.post("/apis", apiRequest);
        Json.writeJson(httpResponse, apiResponse);
      });
    }

    // handleRequest(httpRequest, httpResponse, (httpClient) -> {
    // final Map<String, Object> apiRequest = new LinkedHashMap<>();
    // final List<Map<String, Object>> pluginRequests = new ArrayList<>();
    //
    // if (endPointSetKongParameters(httpRequest, httpResponse, userId, apiRequest,
    // pluginRequests)) {
    // final Map<String, Object> insertData = getMap(requestData, fieldNames);
    // "/apis", ApiService.APIS_FIELD_NAMES
    // final Map<String, Object> apiResponse = httpClient.post("/apis", apiRequest);
    // final String id = (String)apiResponse.get("id");
    // if (id != null) {
    // final String pluginPath = "/apis/" + id + "/plugins";
    // for (final Map<String, Object> pluginRequest : pluginRequests) {
    // pluginRequest.remove("id");
    // httpClient.post(pluginPath, pluginRequest);
    // // TODO error handling
    // }
    // }
    // Json.writeJson(httpResponse, apiResponse);
    // }
    // });
  }

  public void apiGet(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse,
    final String apiName) throws IOException {
    final Map<String, Object> api = apiGet(apiName);
    if (api == null) {
      httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      Json.writeJson(httpResponse, api);
    }
  }

  public Map<String, Object> apiGet(final String apiName) throws IOException {
    return getCachedObject("api", apiName, (httpClient) -> {
      final Map<String, Object> apiResponse = httpClient.get("/apis/" + apiName);
      final String apiId = (String)apiResponse.get("id");
      if (apiId == null) {
        return null;
      } else {
        final Map<String, Object> pluginsResponse = httpClient.get("/apis/" + apiId + "/plugins");
        @SuppressWarnings("unchecked")
        final List<Map<String, Object>> plugins = (List<Map<String, Object>>)pluginsResponse
          .get("data");
        final Map<String, Map<String, Object>> pluginByName = new TreeMap<>();
        for (final Map<String, Object> plugin : plugins) {
          if (plugin.get("consumer_id") == null) {
            final String name = (String)plugin.get("name");
            pluginByName.put(name, plugin);
          }
        }
        apiResponse.put("plugins", pluginByName);
        return apiResponse;
      }
    });
  }

  private String apiGetName(final JsonHttpClient httpClient, final String apiId) {
    String apiName = this.apiNameById.get(apiId);
    if (apiName == null) {
      apiName = apiId;
      try {
        final Map<String, Object> api = httpClient.get("/apis/" + apiId);
        apiName = (String)api.get("name");
        if (apiName != null) {
          this.apiNameById.put(apiId, apiName);
        }
      } catch (final Throwable e) {
      }
    }
    return apiName;
  }

  public void clearCachedObject(final String type, final String id) throws IOException {
    final Map<String, Map<String, Object>> objectById = this.objectByTypeAndId.get(type);
    if (objectById != null) {
      objectById.remove(id);
    }
  }

  public void close() {

  }

  protected Map<String, Object> consumerGet(final JsonHttpClient httpClient, final String filter)
    throws IOException {
    final Map<String, Object> consumerResponse = httpClient.get(filter);
    @SuppressWarnings("unchecked")
    final List<Map<String, Object>> consumers = (List<Map<String, Object>>)consumerResponse
      .get("data");
    if (consumers != null && consumers.size() > 0) {
      final Map<String, Object> consumer = consumers.get(0);
      return consumer;
    } else {
      return Collections.emptyMap();
    }
  }

  private String consumerGetUsername(final JsonHttpClient httpClient, final String consumerId) {
    String username = this.usernameByConsumerId.get(consumerId);
    if (username == null) {
      username = consumerId;
      try {
        final Map<String, Object> consumerResponse = httpClient.get("/consumers/" + consumerId);
        username = (String)consumerResponse.get("username");
        if (username != null) {
          this.usernameByConsumerId.put(consumerId, username);
        }
      } catch (final Throwable e) {
      }
    }
    return username;
  }

  public void consumerGroupAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String username) throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData != null) {
      final String groupName = (String)requestData.get("group");
      groupUserAdd(httpRequest, httpResponse, username, groupName);
    }
  }

  @SuppressWarnings("unchecked")
  public Set<String> consumerGroups(final String customId, final String username)
    throws IOException {
    final Set<String> roles = new TreeSet<>();
    try (
      JsonHttpClient httpClient = newKongClient()) {
      Map<String, Object> consumer = Collections.emptyMap();
      {
        final String customIdFilter = "/consumers/?custom_id=" + customId;
        consumer = consumerGet(httpClient, customIdFilter);
      }
      if (consumer.isEmpty()) {
        final String usernameFilter = "/consumers/?username=" + username;
        consumer = consumerGet(httpClient, usernameFilter);
      } else {
        // Update if username changed
        if (!username.equals(consumer.get("username"))) {
          consumer.put("username", username);
          httpClient.patch("/consumers", consumer);
        }
      }
      if (consumer.isEmpty()) {
        // Create if consumer doesn't exist
        consumer = new HashMap<>();
        consumer.put("custom_id", customId);
        consumer.put("username", username);
        consumer = httpClient.put("/consumers", consumer);
      } else {
        // Update if custom_id changed
        if (!customId.equals(consumer.get("custom_id"))) {
          final String id = (String)consumer.get("id");
          consumer.put("custom_id", customId);
          httpClient.patch("/consumers/" + id, consumer);
        }
      }
      final String id = (String)consumer.get("id");

      this.usernameByConsumerId.put(id, username);
      final String groupsPath = "/consumers/" + id + "/acls";
      final Map<String, Object> groupsResponse = httpClient.get(groupsPath);
      final List<Map<String, Object>> groupList = (List<Map<String, Object>>)groupsResponse
        .get("data");
      if (groupList != null) {
        for (final Map<String, Object> groupRecord : groupList) {
          final String group = (String)groupRecord.get("group");
          roles.add(group);
        }
      }
    }
    return roles;
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
        if (principal.isUserInRole("gwa_admin") || userId.equals(endpointUserId)) {
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

  public void endpointGroupUserAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiName, final String groupName,
    final String userName) throws IOException {
    final boolean hasGroup = endpointHasGroup(apiName, groupName);
    if (hasGroup) {
      groupUserAdd(httpRequest, httpResponse, userName, groupName);
    } else {
      httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  public void endpointGroupUserDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiName, final String groupName,
    final String userName) throws IOException {
    final boolean hasGroup = endpointHasGroup(apiName, groupName);
    if (hasGroup) {
      groupUserDelete(httpRequest, httpResponse, userName, groupName);
    } else {
      writeJsonResponse(httpResponse, DELETED);
    }
  }

  public void endpointGroupUserList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiName, final String groupName)
    throws IOException {
    final boolean hasGroup = endpointHasGroup(apiName, groupName);
    if (hasGroup) {
      final String groupPath = "/groups/" + groupName;
      groupUserList(httpRequest, httpResponse, groupPath);
    } else {
      httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  /**
   * Check if the endpoint has the group in the api_groups. Ignore groups that start with github_ or idir_.
   *
   * @param apiName
   * @param groupName
   * @return
   * @throws IOException
   */
  @SuppressWarnings("unchecked")
  private boolean endpointHasGroup(final String apiName, final String groupName)
    throws IOException {
    if (groupName.startsWith("github_")) {
    } else if (groupName.startsWith("idir_")) {
    } else {
      try {
        final Map<String, Object> api = apiGet(apiName);
        final Map<String, Object> aclPlugin = pluginGet(api, "acl");
        final Map<String, Object> config = (Map<String, Object>)aclPlugin.get("config");
        final List<String> apiGroups = (List<String>)config.get("whitelist");
        return apiGroups.contains(groupName);
      } catch (final Throwable e) {
      }
    }
    return false;
  }

  public void endpointList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final String path = "/plugins?name=bcgov-gwa-endpoint";
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      @SuppressWarnings("unchecked")
      final List<Map<String, Object>> data = (List<Map<String, Object>>)kongResponse.get("data");
      if (data != null) {
        final List<Map<String, Object>> apiRows = new ArrayList<>();
        for (final Map<String, Object> endpoint : data) {
          final String apiId = (String)endpoint.get("api_id");
          final String apiName = apiGetName(httpClient, apiId);
          final Map<String, Object> api = apiGet(apiName);
          if (api != null) {
            final Map<String, Object> apiRow = new LinkedHashMap<>();
            for (final String fieldName : Arrays.asList("id", "name", "created_at", "hosts",
              "uris")) {
              final Object values = api.get(fieldName);
              apiRow.put(fieldName, values);
            }
            apiRows.add(apiRow);
          }
        }
        kongResponse.put("data", apiRows);
      }
      Json.writeJson(httpResponse, kongResponse);
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
      addData(apiRequest, requestData, APIS_FIELD_NAMES);

      final List<Map<String, Object>> plugins = (List<Map<String, Object>>)requestData
        .get("plugins");
      for (final Map<String, Object> plugin : plugins) {
        final String pluginName = (String)plugin.get("name");
        Map<String, Object> pluginConfig = null;
        if (pluginName.equals(BCGOV_GWA_ENDPOINT)) {
          pluginConfig = endPointSetPluginEndpoint(plugin, apiRequest, userId);
        } else if (pluginName.equals("rate-limiting")) {
          // pluginConfig = endPointSetPluginRateLimiting(plugin);
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

  protected Map<String, Object> endPointSetPluginRateLimiting(final String apiId,
    final String pluginName, final Map<String, Object> apiUpdate) {
    final Map<String, Object> pluginUpdate = pluginGet(apiUpdate, pluginName);

    @SuppressWarnings("unchecked")
    final Map<String, Object> configUpdate = (Map<String, Object>)pluginUpdate.get("config");

    final Map<String, Object> pluginConfig = new LinkedHashMap<>();
    addData(pluginConfig, configUpdate, ENDPOINT_RATE_LIMIT_FIELD_NAMES);
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

  private Map<String, Object> getCachedObject(final String type, final String id,
    final JsonHttpFunction action) throws IOException {
    final Map<String, Map<String, Object>> objectById = getObjectById(type);
    Map<String, Object> object = objectById.get(id);
    if (object == null) {
      try (
        JsonHttpClient httpClient = newKongClient()) {
        object = action.apply(httpClient);
      }
      objectById.put(id, object);
    }
    return object;
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

  private String getKongPageUrl(final HttpServletRequest httpRequest, final String path) {
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

    final String[] filterFieldNames = httpRequest.getParameterValues("filterFieldName");
    final String[] filterValues = httpRequest.getParameterValues("filterValue");
    if (filterFieldNames != null && filterValues != null) {
      for (int i = 0; i < filterFieldNames.length; i++) {
        final String filterFieldName = filterFieldNames[i];
        final String filterValue = filterValues[i];
        url.append('&');
        url.append(filterFieldName);
        url.append('=');
        url.append(filterValue);

      }
    }
    final String urlString = url.toString();
    return urlString;
  }

  private Map<String, Object> getMap(final Map<String, Object> requestData,
    final List<String> fieldNames) {
    final Map<String, Object> data = new LinkedHashMap<>();
    addData(data, requestData, fieldNames);
    return data;
  }

  private synchronized Map<String, Map<String, Object>> getObjectById(final String type) {
    Map<String, Map<String, Object>> objectById = this.objectByTypeAndId.get(type);
    if (objectById == null) {
      objectById = new HashMap<>();
      this.objectByTypeAndId.put(type, objectById);
    }
    return objectById;
  }

  private int getPageOffset(final HttpServletRequest httpRequest) {
    final String offset = httpRequest.getParameter("offset");
    int offsetPage = 0;
    if (offset != null) {
      try {
        offsetPage = Integer.parseInt(offset);
      } catch (final Throwable e) {
      }
    }
    return offsetPage;
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

  public void groupUserAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String username, final String groupName)
    throws IOException {

    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> aclRequest = Collections.singletonMap("group", groupName);

      final String aclPath = "/consumers/" + username + "/acls";
      Map<String, Object> apiResponse = Collections.emptyMap();
      try {
        apiResponse = httpClient.post(aclPath, aclRequest);
      } catch (final HttpStatusException e) {
        if (e.getCode() == 404) {
          final Map<String, Object> consumer = Collections.singletonMap("username", username);
          httpClient.post("/consumers", consumer);
          apiResponse = httpClient.post(aclPath, aclRequest);
        }
      }
      Json.writeJson(httpResponse, apiResponse);
    });
  }

  public void groupUserDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String username, final String groupName)
    throws IOException {
    final String path = "/consumers/" + username + "/acls/" + groupName;
    handleDelete(httpRequest, httpResponse, path);
  }

  public void groupUserList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      @SuppressWarnings("unchecked")
      final List<Map<String, Object>> data = (List<Map<String, Object>>)kongResponse.get("data");
      if (data != null) {
        for (final Map<String, Object> acl : data) {
          final String consumerId = (String)acl.get("consumer_id");
          final String username = consumerGetUsername(httpClient, consumerId);
          acl.put("username", username);
        }
      }
      Json.writeJson(httpResponse, kongResponse);
    });
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

  private void handleCachedObject(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String type, final String id,
    final JsonHttpFunction action) throws IOException {
    final Map<String, Map<String, Object>> objectById = getObjectById(type);
    Map<String, Object> object = objectById.get(id);
    if (object == null) {
      object = handleRequest(httpRequest, httpResponse, action);
      objectById.put(id, object);
    }
    if (object != null) {
      Json.writeJson(httpResponse, object);
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
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
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

  public Map<String, Object> handleRequest(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final JsonHttpFunction action) throws IOException {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      return action.apply(httpClient);
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
    return null;
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

  protected Map<String, Object> kongPage(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient, final String path)
    throws IOException, ClientProtocolException {
    int offsetPage = getPageOffset(httpRequest);
    String urlString = getKongPageUrl(httpRequest, path);
    Map<String, Object> kongResponse = Collections.emptyMap();
    do {
      kongResponse = httpClient.getByUrl(urlString);
      urlString = (String)kongResponse.remove("next");
    } while (urlString != null && offsetPage-- > 0);
    return kongResponse;
  }

  protected Map<String, Object> kongPageAll(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient, final String path, final Predicate<Map<String, Object>> filter)
    throws IOException, ClientProtocolException {
    String urlString = getKongPageUrl(httpRequest, path);
    final List<Map<String, Object>> allRows = new ArrayList<>();
    do {
      final Map<String, Object> kongResponse = httpClient.getByUrl(urlString);
      @SuppressWarnings("unchecked")
      final List<Map<String, Object>> rows = (List<Map<String, Object>>)kongResponse.get("data");
      if (rows != null) {
        for (final Map<String, Object> row : rows) {
          if (filter == null || filter.test(row)) {
            allRows.add(row);
          }
        }
      }
      urlString = (String)kongResponse.get("next");
    } while (urlString != null);
    final Map<String, Object> response = new LinkedHashMap<>();
    response.put("data", allRows);
    response.put("total", allRows.size());
    return response;
  }

  public void logError(final String message, final Throwable e) {
    final Class<?> clazz = getClass();
    final Logger logger = LoggerFactory.getLogger(clazz);
    logger.error(message, e);
  }

  public JsonHttpClient newKongClient() {
    return new JsonHttpClient(this.kongAdminUrl);
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> pluginGet(final Map<String, Object> api, final String pluginName) {
    final Map<String, Map<String, Object>> plugins = (Map<String, Map<String, Object>>)api
      .get("plugins");
    if (plugins == null) {
      return null;
    } else {
      return plugins.get(pluginName);
    }
  }

  public void pluginList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final String path = "/plugins";
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      pluginListAddData(httpResponse, httpClient, kongResponse);
    });
  }

  public void pluginList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path,
    final Predicate<Map<String, Object>> filter) throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {
      final Map<String, Object> kongResponse = kongPageAll(httpRequest, httpClient, path, filter);
      pluginListAddData(httpResponse, httpClient, kongResponse);
      @SuppressWarnings("unchecked")
      final List<Map<String, Object>> rows = (List<Map<String, Object>>)kongResponse.get("data");
      if (rows != null) {
        rows.sort(PLUGIN_COMPARATOR);
      }
    });
  }

  private void pluginListAddData(final HttpServletResponse httpResponse,
    final JsonHttpClient httpClient, final Map<String, Object> kongResponse) throws IOException {
    @SuppressWarnings("unchecked")
    final List<Map<String, Object>> data = (List<Map<String, Object>>)kongResponse.get("data");
    if (data != null) {
      for (final Map<String, Object> acl : data) {
        final String apiId = (String)acl.get("api_id");
        final String apiName = apiGetName(httpClient, apiId);
        acl.put("api_name", apiName);

        final String consumerId = (String)acl.get("consumer_id");
        final String username = consumerGetUsername(httpClient, consumerId);
        acl.put("consumer_username", username);
      }
    }
    Json.writeJson(httpResponse, kongResponse);
  }

  @SuppressWarnings("unchecked")
  public void pluginNameList(final HttpServletResponse httpResponse) throws IOException {
    handleRequest(null, httpResponse, (httpClient) -> {
      final Map<String, Object> enabledResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = (List<String>)enabledResponse.get("enabled_plugins");
      Collections.sort(pluginNames);
      final List<Map<String, Object>> rows = new ArrayList<>();
      for (final String pluginName : pluginNames) {
        final Map<String, Object> row = Collections.singletonMap("name", pluginName);
        rows.add(row);
      }
      final Map<String, Object> response = new LinkedHashMap<>();
      response.put("data", rows);
      response.put("total", rows.size());
      Json.writeJson(httpResponse, response);
    });
  }

  @SuppressWarnings("unchecked")
  public void pluginNames(final HttpServletResponse httpResponse) throws IOException {
    handleRequest(null, httpResponse, (httpClient) -> {
      final Map<String, Object> enabledResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = (List<String>)enabledResponse.get("enabled_plugins");
      Collections.sort(pluginNames);
      Json.writeJson(httpResponse, enabledResponse);
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
