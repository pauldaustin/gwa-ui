package ca.bc.gov.gwa.servlet;

import java.io.BufferedReader;
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
import java.util.UUID;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.kong.KongAdminClient;
import ca.bc.gov.gwa.util.Json;
import ca.bc.gov.gwa.util.JsonWriter;

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

  public static ApiService get() {
    return instance;
  }

  @SuppressWarnings("unchecked")
  public static Map<String, Object> readJsonMap(final HttpServletRequest request)
    throws IOException {
    try (
      BufferedReader reader = request.getReader()) {
      final Object data = Json.read(reader);
      if (data instanceof Map) {
        return (Map<String, Object>)data;
      } else {
        return null;
      }
    }
  }

  private String kongAdminUrl = "http://localhost:8001";

  private String appsSuffix = ".apps.revolsys.com";

  private String apisSuffix = ".apis.revolsys.com";

  private String unavailableUrl = "http://major.dev.revolsys.com/gwa/error/503";

  private Cluster cluster;

  private Session session;

  private TableMetadata apiTable;

  private final List<String> apiFieldNames = new ArrayList<>();

  public ApiService() {
  }

  public void apiCreate(final HttpServletRequest request, final HttpServletResponse response,
    final String userId) throws IOException {
    final Map<String, Object> dataMap = readJsonMap(request);
    if (dataMap != null) {
      final String name = (String)dataMap.get("name");
      final List<String> hosts = Arrays.asList(name + this.apisSuffix, name + this.appsSuffix);
      dataMap.put("hosts", hosts);

      final String apiId = apiCreateKong(dataMap);
      if (apiId == null) {

      } else {
        apiCreateCassandra(userId, dataMap, apiId);
        response.setContentType("application/json");
        try (
          PrintWriter writer = response.getWriter()) {
          writer.print("{\"data\":{\"inserted\": true,\"id\":\"");
          writer.print(apiId);
          writer.println("\"}}");
        }
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

  private String apiCreateKong(final Map<String, Object> data) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> apiData = new LinkedHashMap<>();
      for (final String key : APIS_FIELD_NAMES) {
        final Object value = data.get(key);
        if (value != null) {
          apiData.put(key, value);
        }
      }
      final Map<String, Object> apiResponse = kongAdminClient.post("/apis/", apiData);
      if (apiResponse.containsKey("errorCode")) {
        logError(Json.toString(apiResponse), null);
      } else {
        return (String)apiResponse.get("id");
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error updating Api", e);
    }
    return null;
  }

  public void apiDelete(final HttpServletResponse response, final String userId, final UUID apiId)
    throws IOException {
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
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    response.setContentType("application/json");
    try (
      PrintWriter writer = response.getWriter()) {
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
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      kongAdminClient.delete("/apis/" + apiId);
    }
  }

  public void apiGet(final HttpServletResponse response, final String apiId) throws IOException {
    final Map<String, Object> api = apiGetKong(apiId);
    if (api == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      final ResultSet resultSet = this.session.execute("SELECT * FROM gwa.api WHERE id = " + apiId);
      final Row row = resultSet.one();
      setValues(api, row);
      final Map<String, Object> data = Collections.singletonMap("data", api);
      writeJson(response, data);
    }
  }

  public Map<String, Object> apiGetKong(final String apiId) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> apiResponse = kongAdminClient.get("/apis/" + apiId);
      if (apiResponse.containsKey("errorCode")) {
        logError(Json.toString(apiResponse), null);
      } else {
        final Map<String, Object> pluginsResponse = kongAdminClient
          .get("/apis/" + apiId + "/plugins");
        if (pluginsResponse.containsKey("errorCode")) {
          logError(Json.toString(pluginsResponse), null);
        } else {
          @SuppressWarnings("unchecked")
          final List<Map<String, Object>> plugins = (List<Map<String, Object>>)pluginsResponse
            .get("data");
          apiResponse.put("plugins", plugins);
        }
        return apiResponse;
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying API " + apiId, e);
    }
    return null;
  }

  @SuppressWarnings("unchecked")
  public void apiKeyCreate(final HttpServletRequest request, final HttpServletResponse response,
    final String userId, final String pathInfo) {
    try {
      final Map<String, Object> dataMap = readJsonMap(request);
      if (dataMap != null) {
        final Map<String, Object> apiKeyData = (Map<String, Object>)dataMap.get("apiKey");
        final String apiId = pathInfo.substring(1);
        final Update update = QueryBuilder.update("gwa", "api");

        final UserType apiKeyType = this.cluster.getMetadata()
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

        response.setContentType("application/json");
        try (
          PrintWriter writer = response.getWriter()) {
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

  public void apiKeyDelete(final HttpServletResponse response, final String userId,
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
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
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
          response.sendError(HttpServletResponse.SC_NOT_FOUND);
          return;
        }
      }
    } catch (final Throwable e) {
      final String message = "Error selecting Api key apiID=" + apiId + " apiKeyId=" + apiKeyId;
      logError(message, e);
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    final Update update = QueryBuilder.update(this.apiTable);
    update.with(QueryBuilder.discard("api_keys", apiKey));
    update.where(equalEndpointId);

    try {
      this.session.execute(update);
      writeDeleted(response);
    } catch (final DriverException e) {
      final String message = "Error deleting Api key apiID=" + apiId + " apiKeyId=" + apiKeyId;
      logError(message, e);
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
  }

  @SuppressWarnings("unchecked")
  public void apiList(final HttpServletResponse response, final String userId, final boolean all)
    throws IOException {
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

    final Map<String, Object> apiResponse = apiListKong();
    final List<Map<String, Object>> apis = (List<Map<String, Object>>)apiResponse.get("data");
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
    writeJson(response, apiResponse);
  }

  public Map<String, Object> apiListKong() {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> apiData = kongAdminClient.get("/apis");
      if (apiData.containsKey("errorCode")) {
        logError(Json.toString(apiData), null);
      } else {
        return apiData;
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIs", e);
    }
    return Collections.emptyMap();
  }

  public void apiUpdate(final HttpServletRequest request, final String userId,
    final String pathInfo) throws IOException {
    final Map<String, Object> dataMap = readJsonMap(request);
    if (dataMap != null) {
      final String apiId = pathInfo.substring(1);
      apiUpdateCassandra(apiId, userId, dataMap);

      apiUpdateKong(apiId, dataMap);
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

  private void apiUpdateKong(final String apiId, final Map<String, Object> data) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
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
      final Map<String, Object> apiResponse = kongAdminClient.patch("/apis/" + apiId, apiData);
      if (apiResponse.containsKey("errorCode")) {
        logError(Json.toString(apiResponse), null);
      } else {
      }
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
    final Cluster cluster = this.cluster;
    this.cluster = null;
    if (cluster != null) {
      try {
        cluster.close();
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
        final Map<String, Object> config = Json.read(configReader);
        this.kongAdminUrl = (String)config.getOrDefault("kongAdminUrl", this.kongAdminUrl);
        this.appsSuffix = (String)config.getOrDefault("appsSuffix", this.appsSuffix);
        this.apisSuffix = (String)config.getOrDefault("apisSuffix", this.apisSuffix);
        this.unavailableUrl = (String)config.getOrDefault("unavailableUrl", this.unavailableUrl);
        final String databaseHost = (String)config.getOrDefault("databaseHost", "localhost");
        final int databasePort = ((Number)config.getOrDefault("databasePort", 9042)).intValue();
        this.cluster = Cluster.builder()//
          .addContactPoint(databaseHost)//
          .withPort(databasePort)
          .build();

      } catch (final FileNotFoundException e) {
        logError("Unable to find configuration File: " + configFile, e);
      } catch (final IOException e) {
        logError("Error reading configuration File: " + configFile, e);
      }
      final Metadata clusterMetadata = this.cluster.getMetadata();
      final KeyspaceMetadata gwa = clusterMetadata.getKeyspace("gwa");
      this.apiTable = gwa.getTable("api");
      for (final ColumnMetadata column : this.apiTable.getColumns()) {
        final String fieldName = column.getName();
        if (!"id".equals(fieldName)) {
          this.apiFieldNames.add(fieldName);
        }
      }
      this.session = this.cluster.connect();
      instance = this;
    } catch (final RuntimeException e) {
      LoggerFactory.getLogger(getClass()).error("Unable to initialize service", e);
      throw e;
    }
  }

  public Session getSession() {
    return this.session;
  }

  private void kongPluginRequestTransformer(final KongAdminClient kongAdminClient, final Row row,
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
      final Encoder encoder = Base64.getEncoder();
      final byte[] userAndPasswordBytes = userAndPassword.getBytes();
      final String authorization = "Authorization:Basic "
        + encoder.encodeToString(userAndPasswordBytes);
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
      kongAdminClient.post(path, requestTransformations);
    }
  }

  public void logError(final String message, final Throwable e) {
    final Class<?> clazz = getClass();
    final Logger logger = LoggerFactory.getLogger(clazz);
    logger.error(message, e);
  }

  public void pluginAdd(final HttpServletRequest request, final HttpServletResponse response,
    final String userId, final String apiId) throws IOException {
    final Map<String, Object> pluginData = readJsonMap(request);
    if (pluginData != null) {
      try (
        KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {

        final Map<String, Object> apiResponse = kongAdminClient.post("/apis/" + apiId + "/plugins",
          pluginData);
        if (apiResponse.containsKey("errorCode")) {
          logError(Json.toString(apiResponse), null);
        } else {
          writeJson(response, pluginData);
        }
      } catch (final IOException | RuntimeException e) {
        logError("Error updating Plugin", e);
      }
    }
  }

  public void pluginDelete(final HttpServletResponse response, final String userId,
    final String apiId, final String pluginId) throws IOException {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final String path = "/apis/" + apiId + "/plugins/" + pluginId;
      kongAdminClient.delete(path);
    }
    writeDeleted(response);
  }

  @SuppressWarnings("unchecked")
  public void pluginList(final HttpServletResponse response) throws IOException {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> pluginResponse = kongAdminClient.get("/plugins/enabled");
      if (pluginResponse.containsKey("errorCode")) {
        logError(Json.toString(pluginResponse), null);
      } else {
        final List<String> pluginNames = (List<String>)pluginResponse.get("enabled_plugins");
        Collections.sort(pluginNames);
        writeJson(response, pluginResponse);
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIs", e);
    }
  }

  public void pluginSchema(final HttpServletResponse response, final String pluginName)
    throws IOException {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> pluginSchemaResponse = kongAdminClient
        .get("/plugins/schema/" + pluginName);
      if (pluginSchemaResponse.containsKey("errorCode")) {
        logError(Json.toString(pluginSchemaResponse), null);
      } else {
        writeJson(response, pluginSchemaResponse);
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIs", e);
    }
  }

  public void pluginUpdate(final HttpServletRequest request, final HttpServletResponse response,
    final String userId, final String apiId, final String pluginId) throws IOException {
    final Map<String, Object> pluginData = readJsonMap(request);
    if (pluginData != null) {
      try (
        KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {

        final Map<String, Object> apiResponse = kongAdminClient
          .put("/apis/" + apiId + "/plugins/" + pluginId, pluginData);
        if (apiResponse.containsKey("errorCode")) {
          logError(Json.toString(apiResponse), null);
        } else {
          writeJson(response, pluginData);
        }
      } catch (final IOException | RuntimeException e) {
        logError("Error updating Plugin", e);
      }
    }
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

  private void writeDeleted(final HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    try (
      PrintWriter writer = response.getWriter()) {
      writer.println("{\"data\":{\"deleted\": true}}");
    }
  }

  private void writeJson(final HttpServletResponse httpResponse, final Map<String, Object> data)
    throws IOException {
    httpResponse.setContentType("application/json");
    try (
      PrintWriter writer = httpResponse.getWriter();
      JsonWriter jsonWriter = new JsonWriter(writer, false)) {
      jsonWriter.write(data);
    }
  }
}
