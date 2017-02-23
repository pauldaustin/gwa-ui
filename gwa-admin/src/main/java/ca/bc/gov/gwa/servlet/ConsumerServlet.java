package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/rest/consumers/*", loadOnStartup = 1)
public class ConsumerServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  private static final List<String> CONSUMERS_FIELD_NAMES = Arrays.asList("id", "username",
    "custom_id", "created_at");

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      if (pathInfo.lastIndexOf('/') == 0) {
        this.apiService.handleDelete(response, "/consumers" + pathInfo);
      } else {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.handleList(request, response, "/consumers");
    } else {
      if (pathInfo.lastIndexOf('/') == 0) {
        this.apiService.handleGet(request, response, "/consumers" + pathInfo);
      } else {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      }
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.handleInsert(request, response, "/consumers/", "id", CONSUMERS_FIELD_NAMES);
    } else {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      if (pathInfo.lastIndexOf('/') == 0) {
        final String path = "/consumers" + pathInfo;
        this.apiService.handleUpdate(request, response, path, CONSUMERS_FIELD_NAMES);
      } else {
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      }
    }
  }
}
