package ca.bc.gov.gwa.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.util.Json;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;
import com.datastax.driver.core.querybuilder.Assignment;
import com.datastax.driver.core.querybuilder.Clause;
import com.datastax.driver.core.querybuilder.QueryBuilder;
import com.datastax.driver.core.querybuilder.Update;

@WebServlet(urlPatterns = "/data/endPoints/*", loadOnStartup = 1)
public class EndPointServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  public static String getString(final Reader reader) {
    final StringBuilder builder = new StringBuilder();
    try {
      final char[] buffer = new char[4906];
      int count;
      while ((count = reader.read(buffer)) > -1) {
        builder.append(buffer, 0, count);
      }
    } catch (final IOException e) {
      throw new RuntimeException(e);
    }
    return builder.toString();
  }

  private Cluster cluster;

  private Session session;

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
    // TODO get actual userid
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      final String endPointId = pathInfo.substring(1);
      response.setContentType("application/json");

      try (
        PrintWriter writer = response.getWriter()) {
        final ResultSet resultSet = this.session.execute("DELETE FROM gwa.end_point WHERE id = "
          + endPointId + "  IF created_by = '" + userId + "'");
        final Row row = resultSet.one();
        final boolean deleted = row.getBool(0);
        if (deleted) {
          writer.println("{\"data\":{\"deleted\": true}}");
        } else {
          final String recordUserId = row.getString(1);
          if (userId.equals(recordUserId)) {
            // Record not found so confirm it was deleted
            writer.println("{\"data\":{\"deleted\": true}}");
          } else {
            writer.println(
              "{\"data\":{\"deleted\": false,\"message\":\"Cannot delete other users endpoints\"}}");
          }
        }
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
      writeJsonList(response, query);
    } else if ("/my".equals(pathInfo)) {
      final String query = "SELECT JSON * FROM gwa.end_point WHERE created_by = '" + userId + "'";
      writeJsonList(response, query);
    } else {
      final String endPointId = pathInfo.substring(1);
      final String query = "SELECT JSON * FROM gwa.end_point WHERE id = " + endPointId;
      writeJsonObject(response, query);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      // TODO create
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
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

  private String getUserId() {
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
      this.session = this.cluster.connect();
    } finally {
    }
  }

  private void writeJsonList(final HttpServletResponse response, final String query)
    throws IOException {
    response.setContentType("application/json");
    try (
      PrintWriter writer = response.getWriter()) {
      final ResultSet resultSet = this.session.execute(query);
      writer.println("{\"data\":[");
      boolean first = true;
      for (final Row row : resultSet) {
        if (first) {
          first = false;
        } else {
          writer.println(',');
        }
        final String json = row.getString(0);
        writer.print(json);
      }
      writer.println();
      writer.println("]}");
    }
  }

  private void writeJsonObject(final HttpServletResponse response, final String query)
    throws IOException {
    final ResultSet resultSet = this.session.execute(query);
    final Row row = resultSet.one();
    if (row == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      response.setContentType("application/json");
      try (
        PrintWriter writer = response.getWriter()) {
        writer.println("{\"data\":");
        final String json = row.getString(0);
        writer.print(json);
        writer.println("}");
      }
    }
  }
}
