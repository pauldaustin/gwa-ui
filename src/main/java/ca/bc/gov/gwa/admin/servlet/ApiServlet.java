package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/int/rest/apis/*", loadOnStartup = 1)
public class ApiServlet extends BaseAdminServlet {
  private static final String API = "api";

  private static final String APIS_PATH = "/apis/";

  private static final String GROUPS = "groups";

  private static final List<String> PLUGIN_FIELD_NAMES = Arrays.asList("id", "name", "config");

  private static final String PLUGINS = "plugins";

  private static final String PLUGINS_PATH = "/plugins/";

  private static final long serialVersionUID = 1L;

  private static final String USERS = "users";

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 1:
        doDeleteApi(response, paths);
      break;

      case 2:
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      case 3:
        if (PLUGINS.equals(paths.get(1))) {
          doDeletePlugin(response, paths);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;
      case 5:
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          doDeleteGroupUser(response, paths);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  protected void doDeleteApi(final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String path = APIS_PATH + apiName;
    BaseServlet.apiService.handleDelete(response, path);
    BaseServlet.apiService.clearCachedObject(API, apiName);
  }

  protected void doDeleteGroupUser(final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String groupName = paths.get(2);
    final String userName = paths.get(4);
    BaseServlet.apiService.apiGroupUserDelete(response, apiName, groupName, userName);
  }

  protected void doDeletePlugin(final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String pluginName = paths.get(2);
    final String path = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
    BaseServlet.apiService.handleDelete(response, path);
    BaseServlet.apiService.clearCachedObject(API, apiName);
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: // API List
        doGetApiList(request, response);
      break;

      case 1:
        doGetApi(response, paths);
      break;

      case 2:
        final String apiId = paths.get(0);
        if (PLUGINS.equals(paths.get(1))) { // Plugin list
          doGetPluginList(request, response, apiId);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      case 4:
        final String apiName = paths.get(0);
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          final String groupName = paths.get(2);
          BaseServlet.apiService.endpointGroupUserList(request, response, apiName, groupName);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  protected void doGetApi(final HttpServletResponse response, final List<String> paths) {
    final String apiId = paths.get(0);
    BaseServlet.apiService.apiGet(response, apiId);
  }

  protected void doGetApiList(final HttpServletRequest request,
    final HttpServletResponse response) {
    BaseServlet.apiService.handleListAll(request, response, "/apis");
  }

  protected void doGetPluginList(final HttpServletRequest request,
    final HttpServletResponse response, final String apiId) {
    BaseServlet.apiService.pluginList(request, response, "/plugins?api_id=" + apiId,
      row -> row.get("consumer_id") == null);
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: // API
        doPostApiAdd(request, response);
      break;

      case 1:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 2:
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          doPostPluginAdd(request, response, paths);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      case 3:
        if (PLUGINS.equals(paths.get(1))) {
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;
      case 5:
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          doPostGroupUserAdd(response, paths);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  protected void doPostApiAdd(final HttpServletRequest request,
    final HttpServletResponse response) {
    BaseServlet.apiService.apiAdd(request, response);
  }

  protected void doPostGroupUserAdd(final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String groupName = paths.get(2);
    final String userName = paths.get(4);
    BaseServlet.apiService.apiGroupUserAdd(response, apiName, groupName, userName);
  }

  protected void doPostPluginAdd(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String pluginAddPath = APIS_PATH + apiName + "/plugins";
    BaseServlet.apiService.handleAdd(request, response, pluginAddPath);
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
        doPutApiUpdate(request, response, paths);
      break;

      case 2:
        if (PLUGINS.equals(paths.get(1))) {
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      case 3:
        if (PLUGINS.equals(paths.get(1))) {
          doPutPluginUpdate(request, response, paths);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;
      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  protected void doPutApiUpdate(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    BaseServlet.apiService.apiUpdate(request, response, apiName);
  }

  protected void doPutPluginUpdate(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String pluginName = paths.get(2);
    final String updatePath = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
    BaseServlet.apiService.handleUpdatePatch(request, response, updatePath,
      ApiServlet.PLUGIN_FIELD_NAMES);
    BaseServlet.apiService.clearCachedObject(API, apiName);
  }
}
