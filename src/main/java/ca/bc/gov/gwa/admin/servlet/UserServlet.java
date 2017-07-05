package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/int/rest/users/*", loadOnStartup = 1)
public class UserServlet extends BaseAdminServlet {
  private static final String PLUGINS = "plugins";

  private static final String GROUPS = "groups";

  private static final String CONSUMERS_PATH = "/consumers/";

  private static final long serialVersionUID = 1L;

  private static final List<String> CONSUMER_FIELD_NAMES = Arrays.asList("id", "username",
    "custom_id", "created_at");

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 1:
        doDeleteUser(response, paths);
      break;

      case 0:
      case 2:
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 3:
        if (GROUPS.equals(paths.get(1))) {
          doDeleteUserGroup(response, paths);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  private void doDeleteUser(final HttpServletResponse response, final List<String> paths) {
    final String username = paths.get(0);
    final String consumerPath = CONSUMERS_PATH + username;
    this.apiService.handleDelete(response, consumerPath);
  }

  private void doDeleteUserGroup(final HttpServletResponse response, final List<String> paths) {
    final String username = paths.get(0);
    final String groupId = paths.get(2);
    final String groupPath = CONSUMERS_PATH + username + "/acls/" + groupId;
    this.apiService.handleDelete(response, groupPath);
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        doGetUserList(request, response);
      break;

      case 1:
        doGetUser(response, paths);
      break;

      case 2:
        if (GROUPS.equals(paths.get(1))) {
          doGetUserGroups(request, response, paths);
        } else if (PLUGINS.equals(paths.get(1))) {
          doGetUserPlugins(request, response, paths);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  private void doGetUser(final HttpServletResponse response, final List<String> paths) {
    final String username = paths.get(0);
    final String consumerPath = CONSUMERS_PATH + username;
    this.apiService.handleGet(response, consumerPath);
  }

  private void doGetUserGroups(final HttpServletRequest request, final HttpServletResponse response,
    final List<String> paths) {
    final String consumerIdOrUsername = paths.get(0);
    final String groupsPath = CONSUMERS_PATH + consumerIdOrUsername + "/acls";
    this.apiService.handleList(request, response, groupsPath);
  }

  private void doGetUserList(final HttpServletRequest request, final HttpServletResponse response) {
    this.apiService.handleList(request, response, "/consumers");
  }

  private void doGetUserPlugins(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String consumerIdOrUsername = paths.get(0);
    this.apiService.pluginList(request, response, "/plugins?consumer_id=" + consumerIdOrUsername,
      null);
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        doPostUserAdd(request, response);
      break;

      case 1:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 2:
        if (GROUPS.equals(paths.get(1))) {
          doPostUserGroupAdd(request, response, paths);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  private void doPostUserAdd(final HttpServletRequest request, final HttpServletResponse response) {
    this.apiService.handleAdd(request, response, CONSUMERS_PATH, CONSUMER_FIELD_NAMES);
  }

  private void doPostUserGroupAdd(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String username = paths.get(0);
    this.apiService.consumerGroupAdd(request, response, username);
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 1:
        doPutUserUpdate(request, response, paths);
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  private void doPutUserUpdate(final HttpServletRequest request, final HttpServletResponse response,
    final List<String> paths) {
    final String username = paths.get(0);
    this.apiService.handleUpdatePatch(request, response, CONSUMERS_PATH + username,
      CONSUMER_FIELD_NAMES);
  }

}
