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

public class EndPointService {

  private static final List<String> APIS_FIELD_NAMES = Arrays.asList("id", "name", "upstream_url",
    "preserve_host", "created_at", "retries", "https_only", "http_if_terminated", "hosts", "uris",
    "methods", "strip_uri");

  private String kongAdminUrl = "http://localhost:8001";

  private String appsSuffix = ".apps.revolsys.com";

  private String apisSuffix = ".apis.revolsys.com";

  private String unavailableUrl = "http://major.dev.revolsys.com/gwa/error/503";

  private Cluster cluster;

  private Session session;

  private final TableMetadata endPointTable;

  private final List<String> endPointFieldNames = new ArrayList<>();

  public EndPointService(final String databaseHost, final int databasePort) {
    final String configFile = "/apps/config/gwa/gwa.json";
    try (
      Reader configReader = new FileReader(configFile)) {
      final Map<String, Object> config = Json.read(configReader);
      this.kongAdminUrl = (String)config.getOrDefault("kongAdminUrl", this.kongAdminUrl);
      this.appsSuffix = (String)config.getOrDefault("appsSuffix", this.appsSuffix);
      this.apisSuffix = (String)config.getOrDefault("apisSuffix", this.apisSuffix);
      this.unavailableUrl = (String)config.getOrDefault("unavailableUrl", this.unavailableUrl);

    } catch (final FileNotFoundException e) {
      logError("Unable to find configuration File: " + configFile, e);
    } catch (final IOException e) {
      logError("Error reading configuration File: " + configFile, e);
    }
    this.cluster = Cluster.builder()//
      .addContactPoint(databaseHost)//
      .withPort(databasePort)
      .build();
    final Metadata clusterMetadata = this.cluster.getMetadata();
    final KeyspaceMetadata gwa = clusterMetadata.getKeyspace("gwa");
    this.endPointTable = gwa.getTable("end_point");
    for (final ColumnMetadata column : this.endPointTable.getColumns()) {
      final String fieldName = column.getName();
      if (!"id".equals(fieldName)) {
        this.endPointFieldNames.add(fieldName);
      }
    }
    this.session = this.cluster.connect();
  }

  @SuppressWarnings("unchecked")
  public void apiKeyCreate(final HttpServletRequest request, final HttpServletResponse response,
    final String userId, final String pathInfo) {
    try {
      try (
        BufferedReader reader = request.getReader()) {
        final Object data = Json.read(reader);
        if (data instanceof Map) {
          final Map<String, Object> dataMap = (Map<String, Object>)data;
          final Map<String, Object> apiKeyData = (Map<String, Object>)dataMap.get("apiKey");
          final String endPointId = pathInfo.substring(1);
          final Update update = QueryBuilder.update("gwa", "end_point");

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
          final Clause equalId = QueryBuilder.eq("id", UUID.fromString(endPointId));
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
      }
    } catch (final Throwable e) {
      logError("Error", e);
    }
  }

  public void apiKeyDelete(final HttpServletResponse response, final String userId,
    final UUID endPointId, final UUID apiKeyId) throws IOException {
    final Clause equalEndpointId = QueryBuilder.eq("id", endPointId);
    final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
    UDTValue apiKey = null;
    try {
      final Select select = QueryBuilder.select() //
        .from(this.endPointTable);
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
      final String message = "Error selecting API key endPointID=" + endPointId + " apiKeyId="
        + apiKeyId;
      logError(message, e);
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
    }
    final Update update = QueryBuilder.update(this.endPointTable);
    update.with(QueryBuilder.discard("api_keys", apiKey));
    update.where(equalEndpointId);

    try {
      this.session.execute(update);
      response.setContentType("application/json");
      try (
        PrintWriter writer = response.getWriter()) {
        writer.println("{\"data\":{\"deleted\": true}}");
      }
    } catch (final DriverException e) {
      final String message = "Error deleting API key endPointID=" + endPointId + " apiKeyId="
        + apiKeyId;
      logError(message, e);
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      return;
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

  @SuppressWarnings("unchecked")
  public void endPointCreate(final HttpServletRequest request, final HttpServletResponse response,
    final String userId) throws IOException {
    try (
      BufferedReader reader = request.getReader()) {
      final Object data = Json.read(reader);
      if (data instanceof Map) {
        final Map<String, Object> dataMap = (Map<String, Object>)data;
        final String name = (String)dataMap.get("name");
        final List<String> hosts = Arrays.asList(name + this.apisSuffix, name + this.appsSuffix);
        dataMap.put("hosts", hosts);

        final String endPointId = endPointCreateKong(dataMap);
        if (endPointId == null) {

        } else {
          endPointCreateCassandra(userId, dataMap, endPointId);
          response.setContentType("application/json");
          try (
            PrintWriter writer = response.getWriter()) {
            writer.print("{\"data\":{\"inserted\": true,\"id\":\"");
            writer.print(endPointId);
            writer.println("\"}}");
          }
        }
      }
    }
  }

  private void endPointCreateCassandra(final String userId, final Map<String, Object> dataMap,
    final String endPointId) {
    final Insert insert = QueryBuilder.insertInto("gwa", "end_point");
    insert.value("id", UUID.fromString(endPointId));
    insert.value("created_by", userId);
    for (final String fieldName : this.endPointFieldNames) {
      final Object value = dataMap.get(fieldName);
      if (value != null) {
        insert.value(fieldName, value);
      }
    }
    this.session.execute(insert);
  }

  private String endPointCreateKong(final Map<String, Object> data) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> apiData = new LinkedHashMap<>();
      for (final String key : APIS_FIELD_NAMES) {
        final Object value = data.get(key);
        if (value != null) {
          apiData.put(key, value);
        }
      }
      final Map<String, Object> endPointData = kongAdminClient.post("/apis/", apiData);
      if (endPointData.containsKey("errorCode")) {
        logError(Json.toString(endPointData), null);
      } else {
        return (String)endPointData.get("id");
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error updating API", e);
    }
    return null;
  }

  public void endPointDelete(final HttpServletResponse response, final String userId,
    final UUID endPointId) throws IOException {
    endPointDeleteKong(endPointId);
    final Row row;
    try {
      final Delete delete = QueryBuilder.delete()//
        .from(this.endPointTable);
      delete.where(QueryBuilder.eq("id", endPointId));
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
            "{\"data\":{\"deleted\": false,\"message\":\"Cannot delete another user's End Point\"}}");
        }
      }
    }
  }

  public void endPointDeleteKong(final UUID endPointId) throws IOException {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      kongAdminClient.delete("/apis/" + endPointId);
    }
  }

  public void endPointGet(final HttpServletResponse response, final String endPointId)
    throws IOException {
    final Map<String, Object> endPoint = endPointGetKong(endPointId);
    if (endPoint == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      final ResultSet resultSet = this.session
        .execute("SELECT * FROM gwa.end_point WHERE id = " + endPointId);
      final Row row = resultSet.one();
      setValues(endPoint, row);
      final Map<String, Object> data = Collections.singletonMap("data", endPoint);
      writeJson(response, data);
    }
  }

  public Map<String, Object> endPointGetKong(final String apiId) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> endPointData = kongAdminClient.get("/apis/" + apiId);
      if (endPointData.containsKey("errorCode")) {
        logError(Json.toString(endPointData), null);
      } else {
        return endPointData;
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIS", e);
    }
    return null;
  }

  @SuppressWarnings("unchecked")
  public void endPointList(final HttpServletResponse response, final String userId,
    final boolean all) throws IOException {
    final Map<String, Row> rowsById = new HashMap<>();
    final ResultSet resultSet;
    if (all) {
      resultSet = this.session.execute("SELECT * FROM gwa.end_point");
    } else {
      resultSet = this.session.execute("SELECT * FROM gwa.end_point where created_by = ?", userId);
    }

    for (final Row row : resultSet) {
      final UUID endPointId = row.getUUID("id");
      rowsById.put(endPointId.toString(), row);
    }

    final Map<String, Object> endPointResponse = endPointListKong();
    final List<Map<String, Object>> endPoints = (List<Map<String, Object>>)endPointResponse
      .get("data");
    for (final Iterator<Map<String, Object>> iterator = endPoints.iterator(); iterator.hasNext();) {
      final Map<String, Object> endPoint = iterator.next();
      final String endPointId = (String)endPoint.get("id");
      final Row row = rowsById.get(endPointId);
      if (row == null) {
        if (!all) {
          iterator.remove();
        }
      } else {
        setValues(endPoint, row);
      }
    }
    writeJson(response, endPointResponse);
  }

  public Map<String, Object> endPointListKong() {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> endPointData = kongAdminClient.get("/apis");
      if (endPointData.containsKey("errorCode")) {
        logError(Json.toString(endPointData), null);
      } else {
        return endPointData;
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error querying APIS", e);
    }
    return Collections.emptyMap();
  }

  @SuppressWarnings("unchecked")
  public void endPointUpdate(final HttpServletRequest request, final String userId,
    final String pathInfo) throws IOException {
    try (
      BufferedReader reader = request.getReader()) {
      final Object data = Json.read(reader);
      if (data instanceof Map) {
        final Map<String, Object> dataMap = (Map<String, Object>)data;
        final String endPointId = pathInfo.substring(1);
        endPointUpdateCassandra(endPointId, userId, dataMap);

        endPointUpdateKong(endPointId, dataMap);
      }
    }
  }

  private UUID endPointUpdateCassandra(final String endPointIdString, final String userId,
    final Map<String, Object> dataMap) {
    final Update update = QueryBuilder.update("gwa", "end_point");
    for (final String fieldName : this.endPointFieldNames) {
      final Object value = dataMap.get(fieldName);
      final Assignment set = QueryBuilder.set(fieldName, value);
      update.with(set);
    }

    final UUID endPointId = UUID.fromString(endPointIdString);
    final Clause equalId = QueryBuilder.eq("id", endPointId);
    update.where(equalId);
    final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
    update.onlyIf(equalCreatedBy);
    this.session.execute(update);
    return endPointId;
  }

  private void endPointUpdateKong(final String endPointId, final Map<String, Object> data) {
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      final Map<String, Object> apiData = new LinkedHashMap<>();
      for (final String key : APIS_FIELD_NAMES) {
        final Object value = data.get(key);
        if (value != null) {
          apiData.put(key, value);
        }
      }
      final Map<String, Object> endPointData = kongAdminClient.patch("/apis/" + endPointId,
        apiData);
      if (endPointData.containsKey("errorCode")) {
        logError(Json.toString(endPointData), null);
      } else {
      }
    } catch (final IOException | RuntimeException e) {
      logError("Error updating API", e);
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
