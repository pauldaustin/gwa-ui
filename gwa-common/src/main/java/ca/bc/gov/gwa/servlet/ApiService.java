package ca.bc.gov.gwa.servlet;

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
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;
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

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ColumnDefinitions.Definition;
import com.datastax.driver.core.ColumnMetadata;
import com.datastax.driver.core.KeyspaceMetadata;
import com.datastax.driver.core.Metadata;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;
import com.datastax.driver.core.TableMetadata;
import com.datastax.driver.core.UDTValue;
import com.datastax.driver.core.UserType;
import com.datastax.driver.core.exceptions.DriverException;
import com.datastax.driver.core.querybuilder.Assignment;
import com.datastax.driver.core.querybuilder.Clause;
import com.datastax.driver.core.querybuilder.Delete;
import com.datastax.driver.core.querybuilder.Insert;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.datastax.driver.core.querybuilder.Select;
import com.datastax.driver.core.querybuilder.Update;
import com.datastax.driver.core.utils.UUIDs;

@WebListener
public class ApiService implements ServletContextListener {

  private static final List<String> APIS_FIELD_NAMES = Arrays.asList("id", "name", "upstream_url",
    "preserve_host", "created_at", "retries", "https_only", "http_if_terminated", "hosts", "uris",
    "methods", "strip_uri");

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

  private Cluster node;

  private Session session;

  private TableMetadata apiTable;

  private final List<String> apiFieldNames = new ArrayList<>();

  private Map<String, Object> config = Collections.emptyMap();

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

  public void apiAdd(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse,
    final String userId) throws IOException {
    final Map<String, Object> dataMap = Json.readJsonMap(httpRequest);
    if (dataMap != null) {
      final String name = (String)dataMap.get("name");
      final List<String> hosts = Arrays.asList(name + this.apisSuffix, name + this.appsSuffix);
      dataMap.put("hosts", hosts);

      final String apiId = apiCreateKong(httpResponse, dataMap);
      if (apiId == null) {

      } else {
        apiCreateCassandra(userId, dataMap, apiId);
        writeInserted(httpResponse, apiId);
      }
    }
  }

  private void apiCreateCassandra(final String userId, final Map<String, Object> dataMap,
    final String apiId) {
    final Insert insert = QueryBuilder.insertInto("gwa", "api");
    insert.value("id", UUID.fromString(apiId));
    insert.value("created_by", userId);
    for (final String fieldName : this.apiFieldNames) {
      if (!"created_by".equals(fieldName)) {
        final Object value = dataMap.get(fieldName);
        if (value != null) {
          insert.value(fieldName, value);
        }
      }
    }
    this.session.execute(insert);
  }

  private String apiCreateKong(final HttpServletResponse httpResponse,
    final Map<String, Object> data) {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      final Map<String, Object> apiData = new LinkedHashMap<>();
      for (final String key : APIS_FIELD_NAMES) {
        final Object value = data.get(key);
        if (value != null) {
          apiData.put(key, value);
        }
      }
      final Map<String, Object> apiResponse = httpClient.post("/apis/", apiData);
      return (String)apiResponse.get("id");
    } catch (final IOException | RuntimeException e) {
      logError("Error updating Api", e);
    }
    return null;
  }

  public void apiDelete(final HttpServletResponse httpResponse, final String userId,
    final UUID apiId) throws IOException {
    apiDeleteKong(apiId);
    final Row row;
    try {
      final Delete delete = QueryBuilder.delete()//
        .from(this.apiTable);
      delete.where(QueryBuilder.eq("id", apiId));
      delete.onlyIf(QueryBuilder.eq("created_by", userId));

      final ResultSet resultSet = this.session.execute(delete);
      row = resultSet.one();
    } catch (final Throwable e) {
      final String message = "";
      logError(message, e);
      httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      if (row == null || row.getBool(0)) {
        writer.println("{\"data\":{\"deleted\": true}}");
      } else {
        final String recordUserId;
        if (row.getColumnDefinitions().size() > 1) {
          recordUserId = row.getString(1);
        } else {
          recordUserId = null;
        }
        if (recordUserId == null || userId.equals(recordUserId)) {
          // Record not found so mark it as was deleted
          writer.println("{\"data\":{\"deleted\": true}}");
        } else {
          writer.println(
            "{\"data\":{\"deleted\": false,\"message\":\"Cannot delete another user's Api\"}}");
        }
      }
    }
  }

  public void apiDeleteKong(final UUID apiId) throws IOException {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      httpClient.delete("/apis/" + apiId);
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

  public void apiGetOld(final HttpServletResponse httpResponse, final String apiName)
    throws IOException {
    // final Map<String, Object> api = apiGet(httpResponse, apiName);
    // if (api == null) {
    // httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
    // } else {
    // final String apiId = (String)api.get("id");
    // final ResultSet resultSet = this.session.execute("SELECT * FROM gwa.api WHERE id = " +
    // apiId);
    // final Row row = resultSet.one();
    // setValues(api, row);
    // writeJson(httpResponse, api);
    // }
  }

  @SuppressWarnings("unchecked")
  public void apiKeyCreate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String userId, final String pathInfo) {
    try {
      final Map<String, Object> dataMap = Json.readJsonMap(httpRequest);
      if (dataMap != null) {
        final Map<String, Object> apiKeyData = (Map<String, Object>)dataMap.get("apiKey");
        final String apiId = pathInfo.substring(1);
        final Update update = QueryBuilder.update("gwa", "api");

        final UserType apiKeyType = this.node.getMetadata()
          .getKeyspace("gwa")
          .getUserType("api_key");
        final String userTitle = (String)apiKeyData.get("user_title");
        final UUID apiKeyId = UUIDs.random();
        final UDTValue apiKey = apiKeyType.newValue()
          .setUUID("id", apiKeyId)
          .setString("user_title", userTitle)
          .setBool("developer_key", false)
          .setBool("enabled", true);

        final Assignment append = QueryBuilder.append("api_keys", apiKey);
        update.with(append);
        final Clause equalId = QueryBuilder.eq("id", UUID.fromString(apiId));
        update.where(equalId);
        final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
        update.onlyIf(equalCreatedBy);
        this.session.execute(update);

        httpResponse.setContentType("application/json");
        try (
          PrintWriter writer = httpResponse.getWriter()) {
          writer.print("{\"data\":");
          final Map<String, Object> apiKeyMap = new LinkedHashMap<>();
          apiKeyMap.put("id", apiKeyId);
          apiKeyMap.put("user_title", userTitle);
          apiKeyMap.put("developer_key", false);
          apiKeyMap.put("enabled", true);

          final String string = Json.toString(apiKeyMap);
          writer.print(string);
          writer.println("}");
        }
      }
    } catch (final Throwable e) {
      logError("Error", e);
    }
  }

  public void apiKeyDelete(final HttpServletResponse httpResponse, final String userId,
    final UUID apiId, final UUID apiKeyId) throws IOException {
    final Clause equalEndpointId = QueryBuilder.eq("id", apiId);
    final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
    UDTValue apiKey = null;
    try {
      final Select select = QueryBuilder.select() //
        .from(this.apiTable);
      select.where()//
        .and(equalEndpointId)//
        .and(equalCreatedBy);
      final ResultSet resultSet = this.session.execute(select);
      final Row row = resultSet.one();
      if (row == null) {
        httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
        return;
      } else {
        final List<UDTValue> apiKeys = row.getList("api_keys", UDTValue.class);
        for (final UDTValue currentApiKey : apiKeys) {
          final UUID currentApiKeyId = currentApiKey.getUUID(0);
          if (currentApiKeyId.equals(apiKeyId)) {
            apiKey = currentApiKey;
          }
        }
        if (apiKey == null) {
          httpResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
          return;
        }
      }
    } catch (final Throwable e) {
      final String message = "Error selecting Api key apiID=" + apiId + " apiKeyId=" + apiKeyId;
      logError(message, e);
      httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    final Update update = QueryBuilder.update(this.apiTable);
    update.with(QueryBuilder.discard("api_keys", apiKey));
    update.where(equalEndpointId);

    try {
      this.session.execute(update);
      writeJsonResponse(httpResponse, DELETED);
    } catch (final DriverException e) {
      final String message = "Error deleting Api key apiID=" + apiId + " apiKeyId=" + apiKeyId;
      logError(message, e);
      httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
  }

  @SuppressWarnings("unchecked")
  public void apiList(final HttpServletResponse httpResponse, final String userId,
    final boolean all) throws IOException {
    final Map<String, Row> rowsById = new HashMap<>();
    final ResultSet resultSet;
    if (all) {
      resultSet = this.session.execute("SELECT * FROM gwa.api");
    } else {
      resultSet = this.session.execute("SELECT * FROM gwa.api where created_by = ?", userId);
    }

    for (final Row row : resultSet) {
      final UUID apiId = row.getUUID("id");
      rowsById.put(apiId.toString(), row);
    }

    final Map<String, Object> apiResponse = apiListKong(httpResponse);
    final List<Map<String, Object>> apis = (List<Map<String, Object>>)apiResponse.get("data");
    if (apis != null) {
      for (final Iterator<Map<String, Object>> iterator = apis.iterator(); iterator.hasNext();) {
        final Map<String, Object> api = iterator.next();
        final String apiId = (String)api.get("id");
        final Row row = rowsById.get(apiId);
        if (row == null) {
          if (!all) {
            iterator.remove();
          }
        } else {
          setValues(api, row);
        }
      }
    }
    Json.writeJson(httpResponse, apiResponse);
  }

  public Map<String, Object> apiListKong(final HttpServletResponse httpResponse) {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      final Map<String, Object> apiData = httpClient.get("/apis");
      return apiData;
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIs", e);
    }
    return Collections.emptyMap();
  }

  public void apiUpdate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String userId, final String pathInfo)
    throws IOException {
    final Map<String, Object> dataMap = Json.readJsonMap(httpRequest);
    if (dataMap != null) {
      final String apiId = pathInfo.substring(1);
      apiUpdateCassandra(apiId, userId, dataMap);

      apiUpdateKong(httpResponse, apiId, dataMap);
    }
  }

  private UUID apiUpdateCassandra(final String apiIdString, final String userId,
    final Map<String, Object> dataMap) {
    final Update update = QueryBuilder.update("gwa", "api");
    for (final String fieldName : this.apiFieldNames) {
      final Object value = dataMap.get(fieldName);
      final Assignment set = QueryBuilder.set(fieldName, value);
      update.with(set);
    }

    final UUID apiId = UUID.fromString(apiIdString);
    final Clause equalId = QueryBuilder.eq("id", apiId);
    update.where(equalId);
    final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
    update.onlyIf(equalCreatedBy);
    this.session.execute(update);
    return apiId;
  }

  private void apiUpdateKong(final HttpServletResponse httpResponse, final String apiId,
    final Map<String, Object> data) {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      final Map<String, Object> apiData = new LinkedHashMap<>();
      for (final String key : APIS_FIELD_NAMES) {
        final Object value = data.get(key);
        if (value != null) {
          apiData.put(key, value);
        }
      }
      final String name = (String)data.get("name");
      final List<String> hosts = Arrays.asList(name + this.apisSuffix, name + this.appsSuffix);
      apiData.put("hosts", hosts);
      final Map<String, Object> apiResponse = httpClient.patch("/apis/" + apiId, apiData);
    } catch (final IOException | RuntimeException e) {
      logError("Error updating Api", e);
    }
  }

  public void close() {
    final Session session = this.session;
    this.session = null;
    if (session != null) {
      try {
        session.close();
      } catch (final Throwable e) {
      }
    }
    final Cluster node = this.node;
    this.node = null;
    if (node != null) {
      try {
        node.close();
      } catch (final Throwable e) {
      }
    }
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
      final String configFile = "/apps/config/gwa/gwa.json";
      try (
        Reader configReader = new FileReader(configFile)) {
        this.config = Json.read(configReader);
        this.kongAdminUrl = (String)this.config.getOrDefault("kongAdminUrl", this.kongAdminUrl);
        this.appsSuffix = (String)this.config.getOrDefault("appsSuffix", this.appsSuffix);
        this.apisSuffix = (String)this.config.getOrDefault("apisSuffix", this.apisSuffix);
        this.unavailableUrl = (String)this.config.getOrDefault("unavailableUrl",
          this.unavailableUrl);
        final String databaseHost = (String)this.config.getOrDefault("databaseHost", "localhost");
        final int databasePort = ((Number)this.config.getOrDefault("databasePort", 9042))
          .intValue();
        this.node = Cluster.builder()//
          .addContactPoint(databaseHost)//
          .withPort(databasePort)
          .build();

      } catch (final FileNotFoundException e) {
        logError("Unable to find configuration File: " + configFile, e);
      } catch (final IOException e) {
        logError("Error reading configuration File: " + configFile, e);
      }
      final Metadata nodeMetadata = this.node.getMetadata();
      final KeyspaceMetadata gwa = nodeMetadata.getKeyspace("gwa");
      this.apiTable = gwa.getTable("api");
      for (final ColumnMetadata column : this.apiTable.getColumns()) {
        final String fieldName = column.getName();
        if (!"id".equals(fieldName)) {
          this.apiFieldNames.add(fieldName);
        }
      }
      this.session = this.node.connect();
      instance = this;
    } catch (final RuntimeException e) {
      LoggerFactory.getLogger(getClass()).error("Unable to initialize service", e);
      throw e;
    }
  }

  public String getConfig(final String name) {
    return (String)this.config.get(name);
  }

  public Session getSession() {
    return this.session;
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
        final Map<String, Object> insertData = new LinkedHashMap<>();
        for (final String key : fieldNames) {
          final Object value = requestData.get(key);
          if (value != null) {
            insertData.put(key, value);
          }
        }
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
      String url = this.kongAdminUrl + path + "?size=" + limit;
      final String offset = httpRequest.getParameter("offset");
      int offsetPage = 0;
      if (offset != null) {
        try {
          offsetPage = Integer.parseInt(offset);
        } catch (final Throwable e) {
        }
      }
      Map<String, Object> kongResponse = Collections.emptyMap();
      do {
        kongResponse = httpClient.getByUrl(url);
        url = (String)kongResponse.remove("next");
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
        writeJsonError(httpResponse, "Kong server not available");
      } else {
        writeJsonError(httpResponse, "Kong server returned an error");
      }
    } catch (final HttpHostConnectException e) {
      writeJsonError(httpResponse, "Kong server not available");
    } catch (final Throwable e) {
      writeJsonError(httpResponse, "Kong server returned an error");
    }
  }

  public void handleUpdate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path, final List<String> fieldNames)
    throws IOException {
    handleRequest(httpRequest, httpResponse, (httpClient) -> {

      final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
      if (requestData == null) {
        httpResponse.sendError(HttpServletResponse.SC_BAD_REQUEST);
      } else {
        final Map<String, Object> updateData = new LinkedHashMap<>();
        for (final String key : fieldNames) {
          final Object value = requestData.get(key);
          if (value != null) {
            updateData.put(key, value);
          }
        }
        httpClient.patch(path, updateData);
        writeJsonResponse(httpResponse, UPDATED);
      }
    });
  }

  public void handleUpdatePut(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) throws IOException {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData != null) {
      try (
        JsonHttpClient httpClient = newKongClient()) {
        @SuppressWarnings("unused")
        final Map<String, Object> kongResponse = httpClient.put(path, requestData);
        writeJsonResponse(httpResponse, UPDATED);
      } catch (final IOException | RuntimeException e) {
        logError("Error updating: " + path, e);
      }
    }
  }

  private void kongPluginRequestTransformer(final JsonHttpClient httpClient, final Row row,
    final String apiId) throws IOException {
    final Map<String, Object> config = new LinkedHashMap<>();
    final Map<String, Object> add = new LinkedHashMap<>();
    final List<String> headers = new ArrayList<>();

    final String upstreamUsername = row.getString("upstream_username");
    final String upstreamPassword = row.getString("upstream_password");
    if (upstreamUsername != null) {
      String userAndPassword;
      if (upstreamPassword == null) {
        userAndPassword = upstreamUsername + ":";
      } else {
        userAndPassword = upstreamUsername + ":" + upstreamPassword;
      }
      final byte[] userAndPasswordBytes = userAndPassword.getBytes();
      final String authorization = "Authorization:Basic "
        + BASE_64_ENCODER.encodeToString(userAndPasswordBytes);
      headers.add(authorization);
    }
    if (!headers.isEmpty()) {
      add.put("headers", headers);
    }
    if (!add.isEmpty()) {
      config.put("add", add);
    }
    if (!config.isEmpty()) {
      final Map<String, Object> requestTransformations = new LinkedHashMap<>();
      requestTransformations.put("name", "request-transformer");
      requestTransformations.put("config", config);
      final String path = "/apis/" + apiId + "/plugins";
      httpClient.post(path, requestTransformations);
    }
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
  public void pluginList(final HttpServletResponse httpResponse) throws IOException {
    handleRequest(null, httpResponse, (httpClient) -> {
      final Map<String, Object> pluginResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = (List<String>)pluginResponse.get("enabled_plugins");
      Collections.sort(pluginNames);
      Json.writeJson(httpResponse, pluginResponse);
    });
  }

  private void setValues(final Map<String, Object> map, final Row row) {
    if (row != null) {
      for (final Definition columnDefinition : row.getColumnDefinitions()) {
        final String name = columnDefinition.getName();
        if (!map.containsKey(name) && !row.isNull(name)) {
          final Object value = row.getObject(name);
          map.put(name, value);
        }
      }
    }
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

  public void writeJsonResponse(final HttpServletResponse httpResponse, final String field)
    throws IOException {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"data\":{\"");
      writer.print(field);
      writer.println("\": true}}");
    }
  }
}
