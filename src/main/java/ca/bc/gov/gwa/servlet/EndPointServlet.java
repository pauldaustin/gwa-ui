package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.util.Json;

import com.datastax.driver.core.Session;

@WebServlet(urlPatterns = "/data/endPoints/*", loadOnStartup = 1)
public class EndPointServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  private EndPointService endPointService;

  @Override
  public void destroy() {
    super.destroy();
    this.endPointService.close();
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
          this.endPointService.apiKeyDelete(response, userId, endPointId, apiKeyId);
          return;
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        final UUID endPointId = UUID.fromString(endPointIdString);
        this.endPointService.endPointDelete(response, userId, endPointId);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    final Session session = this.endPointService.getSession();
    if (pathInfo == null || "/".equals(pathInfo)) {
      final String query = "SELECT JSON * FROM gwa.end_point";
      Json.writeJsonList(session, query, response);
    } else if ("/my".equals(pathInfo)) {
      final String query = "SELECT JSON * FROM gwa.end_point WHERE created_by = '" + userId + "'";
      Json.writeJsonList(session, query, response);
    } else {
      final String endPointId = pathInfo.substring(1);
      final String query = "SELECT JSON * FROM gwa.end_point WHERE id = " + endPointId;
      Json.writeJsonObject(session, query, response);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = getUserId();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.endPointService.endPointCreate(request, response, userId);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      this.endPointService.apiKeyCreate(request, response, userId, pathInfo);
    }
  }

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
      this.endPointService.endPointUpdate(request, userId, pathInfo);
    }
  }

  private String getUserId() {
    // TODO get actual userid
    return "IDIR\\PXAUSTIN";
  }

  @Override
  public void init() throws ServletException {
    super.init();
    this.endPointService = new EndPointService("revolsys.com", 9042);
  }
}
