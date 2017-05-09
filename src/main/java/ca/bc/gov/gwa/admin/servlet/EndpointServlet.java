package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/int/rest/endpoints/*", loadOnStartup = 1)
public class EndpointServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    if (!this.apiService.endpointAccessAllowed(request, response, paths)) {
      return;
    }
    switch (paths.size()) {
      case 5: {
        final String apiName = paths.get(0);
        if ("groups".equals(paths.get(1)) && "users".equals(paths.get(3))) {
          final String groupName = paths.get(2);
          final String userName = paths.get(4);
          this.apiService.apiGroupUserDelete(request, response, apiName, groupName, userName);
        } else {
          response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      }
      break;

      default:
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    if (!this.apiService.endpointAccessAllowed(request, response, paths)) {
      return;
    }
    switch (paths.size()) {
      case 0: { // Endpoint List
        this.apiService.endpointList(request, response);
      }
      break;
      case 1: { // Endpoint Get
        final String apiName = paths.get(0);
        this.apiService.apiGet(request, response, apiName);
      }
      break;

      case 4: {
        final String apiName = paths.get(0);
        if ("groups".equals(paths.get(1)) && "users".equals(paths.get(3))) {
          final String groupName = paths.get(2);
          this.apiService.endpointGroupUserList(request, response, apiName, groupName);
        } else {
          response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      default:
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    if (!this.apiService.endpointAccessAllowed(request, response, paths)) {
      return;
    }
    switch (paths.size()) {
      case 5: {
        final String apiName = paths.get(0);
        if ("groups".equals(paths.get(1)) && "users".equals(paths.get(3))) {
          final String groupName = paths.get(2);
          final String userName = paths.get(4);
          this.apiService.apiGroupUserAdd(request, response, apiName, groupName, userName);
        } else {
          response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      }
      break;

      default:
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    if (!this.apiService.endpointAccessAllowed(request, response, paths)) {
      return;
    }
    switch (paths.size()) {
      case 1: {
        final String userId = request.getRemoteUser();
        this.apiService.endpointUpdate(request, response, userId);
      }
      break;

      default:
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;
    }
  }
}
