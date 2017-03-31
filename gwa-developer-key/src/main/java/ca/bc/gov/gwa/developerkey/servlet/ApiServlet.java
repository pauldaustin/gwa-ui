package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/apis/*", loadOnStartup = 1)
public class ApiServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;
      case 1: { // API Delete
        final String apiName = paths.get(0);
        this.apiService.developerApiDelete(request, response, apiName);
      }
      break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: { // API List
        this.apiService.developerApiList(request, response);
      }
      break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (hasPath(pathInfo)) {
      final String insertPath = "/consumers/" + userId + "/acls";
      this.apiService.handleAdd(request, response, insertPath, Collections.emptyList());
    } else {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  @Override
  public void init() throws ServletException {
    super.init();
    this.apiService.setCaching(false);
  }
}
