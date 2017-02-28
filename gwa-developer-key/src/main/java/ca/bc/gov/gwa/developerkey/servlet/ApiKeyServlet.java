package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/apiKeys/*", loadOnStartup = 1)
public class ApiKeyServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      final String deletePath = "/consumers/" + userId + "/key-auth" + pathInfo;
      this.apiService.handleDelete(response, deletePath);
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      final String listPath = "/consumers/" + userId + "/key-auth";
      this.apiService.handleList(request, response, listPath);
    } else {
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      final String insertPath = "/consumers/" + userId + "/key-auth";
      this.apiService.handleInsert(request, response, insertPath, "id", Collections.emptyList());
    } else {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }
}