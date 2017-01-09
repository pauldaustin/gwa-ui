package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;

@WebServlet(urlPatterns = "/data/endPoints/*", loadOnStartup = 1)
public class EndPointServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

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
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = "IDIR\\PXAUSTIN";
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
    response.setContentType("application/json");
    try (
      PrintWriter writer = response.getWriter()) {
      final ResultSet resultSet = this.session.execute(query);
      writer.println("{\"data\":");
      final Row row = resultSet.one();
      final String json = row.getString(0);
      writer.print(json);
      writer.println("}");
    }
  }
}
