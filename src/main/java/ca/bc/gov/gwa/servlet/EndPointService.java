package ca.bc.gov.gwa.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Base64.Encoder;
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

import com.datastax.driver.core.Cluster;
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

  private final String kongAdminUrl = "http://revolsys.com:8001";

  private final String appsSuffix = ".apps.revolsys.com";

  private final String apisSuffix = ".apis.revolsys.com";

  private Cluster cluster;

  private Session session;

  private TableMetadata endPointTable;

  public EndPointService(final String databaseHost, final int databasePort) {
    try {
      this.cluster = Cluster.builder()//
        .addContactPoint(databaseHost)//
        .withPort(databasePort)
        .build();
      final Metadata clusterMetadata = this.cluster.getMetadata();
      final KeyspaceMetadata gwa = clusterMetadata.getKeyspace("gwa");
      this.endPointTable = gwa.getTable("end_point");
      this.session = this.cluster.connect();
    } finally {
    }
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
        final UUID endPointId = UUIDs.random();
        final Map<String, Object> dataMap = (Map<String, Object>)data;
        dataMap.put("id", endPointId);
        dataMap.put("created_by", userId);
        final Insert insert = QueryBuilder.insertInto("gwa", "end_point");
        dataMap.forEach((key, value) -> {
          if (!(value instanceof List)) {
            insert.value(key, value);
          }
        });
        this.session.execute(insert);
        response.setContentType("application/json");
        try (
          PrintWriter writer = response.getWriter()) {
          writer.print("{\"data\":{\"inserted\": true,\"id\":\"");
          writer.print(endPointId);
          writer.println("\"}}");
        }
        endPointUpdateKong(endPointId);
      }
    }

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
    if (row == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      response.setContentType("application/json");
      try (
        PrintWriter writer = response.getWriter()) {
        final boolean deleted = row.getBool(0);
        if (deleted) {
          writer.println("{\"data\":{\"deleted\": true}}");
        } else {
          final String recordUserId = row.getString(1);
          if (userId.equals(recordUserId)) {
            // Record not found so mark it as was deleted
            writer.println("{\"data\":{\"deleted\": true}}");
          } else {
            writer.println(
              "{\"data\":{\"deleted\": false,\"message\":\"Cannot delete another user's End Point\"}}");
          }
        }
      }
    }
  }

  public void endPointDeleteKong(final UUID endPointId) throws IOException {
    final String query = "SELECT name FROM gwa.end_point WHERE id = " + endPointId;
    final ResultSet resultSet = this.session.execute(query);
    final Row row = resultSet.one();
    if (row != null) {
      final String name = row.getString("name");
      for (final String prefix : Arrays.asList("apis", "apps")) {
        final String apiName = prefix + "_" + name;
        try (
          KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
          kongAdminClient.delete("/apis/" + apiName);
        }
      }
    }
  }

  @SuppressWarnings("unchecked")
  public void endPointUpdate(final HttpServletRequest request, final String userId,
    final String pathInfo) throws IOException {
    try (
      BufferedReader reader = request.getReader()) {
      final Object data = Json.read(reader);
      if (data instanceof Map) {
        final Map<String, Object> dataMap = (Map<String, Object>)data;
        final String endPointIdString = pathInfo.substring(1);
        final Update update = QueryBuilder.update("gwa", "end_point");
        dataMap.forEach((key, value) -> {
          if ("id".equals(key)) {
          } else if (value instanceof List) {
            if ("allowed_http_methods".equals(key)) {
              final Assignment set = QueryBuilder.set(key, value);
              update.with(set);
            }
          } else {
            final Assignment set = QueryBuilder.set(key, value);
            update.with(set);
          }
        });
        final UUID endPointId = UUID.fromString(endPointIdString);
        final Clause equalId = QueryBuilder.eq("id", endPointId);
        update.where(equalId);
        final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
        update.onlyIf(equalCreatedBy);
        this.session.execute(update);
        endPointUpdateKong(endPointId);
      }
    }
  }

  public void endPointUpdateKong(final String prefix, final String hostSuffix, final String name,
    final Row row) {
    final String apiName = prefix + "_" + name;
    try (
      KongAdminClient kongAdminClient = new KongAdminClient(this.kongAdminUrl)) {
      kongAdminClient.delete("/apis/" + apiName);
      final boolean deployApi = row.getBool(prefix + "_deploy");
      final boolean enabled = row.getBool("enabled");
      if (enabled && deployApi) {
        final Map<String, Object> data = new LinkedHashMap<>();
        data.put("name", apiName);
        data.put("request_host", name + hostSuffix);
        final String upstreamUrl = row.getString("upstream_url");
        data.put("upstream_url", upstreamUrl);
        final Map<String, Object> createResult = kongAdminClient.post("/apis/", data);
        if (createResult.containsKey("errorCode")) {
          logError(Json.toString(createResult), null);
        }
        final String apiId = (String)createResult.get("id");
        kongPluginRequestTransformer(kongAdminClient, row, apiId);
      }
    } catch (final IOException e) {
      logError("Error updating API", e);
    }

  }

  public void endPointUpdateKong(final UUID endPointId) {
    final String query = "SELECT * FROM gwa.end_point WHERE id = " + endPointId;
    final ResultSet resultSet = this.session.execute(query);
    final Row row = resultSet.one();
    if (row != null) {
      final String name = row.getString("name");
      endPointUpdateKong("apis", this.apisSuffix, name, row);
      endPointUpdateKong("apps", this.appsSuffix, name, row);
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
}
