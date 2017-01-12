package ca.bc.gov.gwa.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

@WebServlet(urlPatterns = "/data/endPoints/*", loadOnStartup = 1)
public class EndPointServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  private Cluster cluster;

  private Session session;

  private TableMetadata endPointTable;

  @SuppressWarnings("unchecked")
  private void apiKeyCreate(final HttpServletRequest request, final HttpServletResponse response,
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

  private void apiKeyDelete(final HttpServletResponse response, final String userId,
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

  @Override
  public void destroy() {
    super.destroy();
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
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      String endPointIdString = pathInfo.substring(1);
      final int slashIndex = endPointIdString.indexOf('/');
      if (slashIndex > -1) {
        if (endPointIdString.startsWith("apiKeys/", slashIndex + 1)) {
          final String apiKeyIdString = endPointIdString.substring(slashIndex + 9);
          endPointIdString = endPointIdString.substring(0, slashIndex);

          final UUID endPointId = UUID.fromString(endPointIdString);
          final UUID apiKeyId = UUID.fromString(apiKeyIdString);
          apiKeyDelete(response, userId, endPointId, apiKeyId);
          return;
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        final UUID endPointId = UUID.fromString(endPointIdString);
        endPointDelete(response, userId, endPointId);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      final String query = "SELECT JSON * FROM gwa.end_point";
      Json.writeJsonList(this.session, query, response);
    } else if ("/my".equals(pathInfo)) {
      final String query = "SELECT JSON * FROM gwa.end_point WHERE created_by = '" + userId + "'";
      Json.writeJsonList(this.session, query, response);
    } else {
      final String endPointId = pathInfo.substring(1);
      final String query = "SELECT JSON * FROM gwa.end_point WHERE id = " + endPointId;
      Json.writeJsonObject(this.session, query, response);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      endPointCreate(request, response, userId);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      apiKeyCreate(request, response, userId, pathInfo);
    }
  }

  @SuppressWarnings("unchecked")
  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      try (
        BufferedReader reader = request.getReader()) {
        final Object data = Json.read(reader);
        if (data instanceof Map) {
          final Map<String, Object> dataMap = (Map<String, Object>)data;
          final String endPointId = pathInfo.substring(1);
          final Update update = QueryBuilder.update("gwa", "end_point");
          dataMap.forEach((key, value) -> {
            if ("id".equals(key)) {
            } else if (!(value instanceof List)) {
              final Assignment set = QueryBuilder.set(key, value);
              update.with(set);
            }
          });
          final Clause equalId = QueryBuilder.eq("id", UUID.fromString(endPointId));
          update.where(equalId);
          final Clause equalCreatedBy = QueryBuilder.eq("created_by", userId);
          update.onlyIf(equalCreatedBy);
          this.session.execute(update);
        }
      }
    }
  }

  @SuppressWarnings("unchecked")
  private void endPointCreate(final HttpServletRequest request, final HttpServletResponse response,
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
      }
    }
  }

  private void endPointDelete(final HttpServletResponse response, final String userId,
    final UUID endPointId) throws IOException {
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

  private String getUserId() {
    // TODO get actual userid
    return "IDIR\\PXAUSTIN";
  }

  @Override
  public void init() throws ServletException {
    super.init();
    try {
      this.cluster = Cluster.builder()//
        .addContactPoint("server1.revolsys.com")//
        .withPort(9042)
        .build();
      final Metadata clusterMetadata = this.cluster.getMetadata();
      final KeyspaceMetadata gwa = clusterMetadata.getKeyspace("gwa");
      this.endPointTable = gwa.getTable("end_point");
      this.session = this.cluster.connect();
    } finally {
    }
  }

  private void logError(final String message, final Throwable e) {
    final Class<?> clazz = getClass();
    final Logger logger = LoggerFactory.getLogger(clazz);
    logger.error(message, e);
  }
}
