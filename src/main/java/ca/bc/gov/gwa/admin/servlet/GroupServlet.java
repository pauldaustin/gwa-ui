package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/int/rest/groups/*", loadOnStartup = 1)
public class GroupServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (isPathEmpty(pathInfo)) {
      this.apiService.handleListAll(request, response, "/groups");
    } else if (pathInfo.indexOf('/', 1) == -1) {
      final String groupPath = "/groups" + pathInfo;
      this.apiService.groupUserList(request, response, groupPath);
    } else {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
  }

}
