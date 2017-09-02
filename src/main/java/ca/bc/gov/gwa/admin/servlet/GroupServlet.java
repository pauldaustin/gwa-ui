package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/int/rest/groups/*", loadOnStartup = 1)
public class GroupServlet extends BaseServlet {
  private static final String GROUPS_PATH = "/groups/";

  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    final int pathCount = paths.size();

    if (pathCount == 0) {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if (pathCount == 1) {
      final String groupPath = GROUPS_PATH + paths.get(0);
      this.apiService.handleDelete(response, groupPath);
    } else {
      sendError(response, HttpServletResponse.SC_NOT_FOUND);
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    final int pathCount = paths.size();

    if (pathCount == 0) {
      this.apiService.handleListAll(request, response, GROUPS_PATH);
    } else if (pathCount == 1) {
      final String groupPath = GROUPS_PATH + paths.get(0) + "/users";
      this.apiService.groupUserList(request, response, groupPath);
    } else {
      sendError(response, HttpServletResponse.SC_NOT_FOUND);
    }
  }

}
