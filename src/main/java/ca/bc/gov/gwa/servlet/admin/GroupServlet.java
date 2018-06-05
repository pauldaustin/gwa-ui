package ca.bc.gov.gwa.servlet.admin;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;
import ca.bc.gov.gwa.servlet.GwaConstants;

@WebServlet(urlPatterns = "/int/rest/groups/*", loadOnStartup = 1)
public class GroupServlet extends BaseServlet implements GwaConstants {

  private static final long serialVersionUID = 1L;

  @Override
  protected void doService(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String method) {
    int statusCode = HttpServletResponse.SC_NOT_FOUND;
    final List<String> paths = splitPathInfo(httpRequest);
    final int pathCount = paths.size();
    if (pathCount == 0) {
      statusCode = groups(httpRequest, httpResponse, method);
    } else if (pathCount == 1) {
      final String groupName = paths.get(0);
      statusCode = groupRecord(httpRequest, httpResponse, method, groupName);
    } else {
      statusCode = HttpServletResponse.SC_NOT_FOUND;
    }
    if (statusCode != 0) {
      sendError(httpResponse, statusCode);
    }
  }

  private int groupRecord(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String method, final String groupName) {
    final String groupPath = GROUPS_PATH2 + groupName + USERS_PATH;
    if (GET.equals(method)) {
      this.apiService.groupUserList(httpRequest, httpResponse, groupPath);
    } else if (DELETE.equals(method)) {
      this.apiService.handleDelete(httpResponse, groupPath);
    } else {
      return HttpServletResponse.SC_METHOD_NOT_ALLOWED;
    }
    return 0;
  }

  private int groups(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse,
    final String method) {
    if (GET.equals(method)) {
      String groupName = httpRequest.getParameter("groupName");
      if (groupName == null) {
        this.apiService.handleListAll(httpRequest, httpResponse, GROUPS_PATH);
      } else {
        Predicate<Map<String, Object>> filter = group -> {
          String name = (String)group.get("group");
          return name.contains(groupName);
        };
        this.apiService.handleListAll(httpRequest, httpResponse, GROUPS_PATH, filter);
      }
    } else if (POST.equals(method)) {
      this.apiService.handleAdd(httpRequest, httpResponse, GROUPS_PATH,
        Collections.singletonList(GROUP));
    } else {
      return HttpServletResponse.SC_METHOD_NOT_ALLOWED;
    }
    return 0;
  }
}
