package ca.bc.gov.gwa.admin.servlet;

import java.util.Arrays;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/int/rest/apis/*", loadOnStartup = 1)
public class ApiServlet extends BaseAdminServlet {
  private static final String POST = "POST";

  private static final String DELETE = "DELETE";

  private static final String GET = "GET";

  private static final String API = "api";

  private static final String APIS_PATH = "/apis/";

  private static final String GROUPS = "groups";

  private static final List<String> PLUGIN_FIELD_NAMES = Arrays.asList("id", "name", "config");

  private static final String PLUGINS = "plugins";

  private static final String PLUGINS_PATH = "/plugins/";

  private static final long serialVersionUID = 1L;

  private static final String USERS = "users";

  private static final String PUT = "PUT";

  private void do0ApiList(final HttpServletRequest request, final HttpServletResponse response,
    final String method) {
    if (GET.equals(method)) {
      do0ApiListGet(request, response);
    } else if (POST.equals(method)) {
      do0ApiListAdd(request, response);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  protected void do0ApiListAdd(final HttpServletRequest request,
    final HttpServletResponse response) {
    this.apiService.apiAdd(request, response);
  }

  protected void do0ApiListGet(final HttpServletRequest request,
    final HttpServletResponse response) {
    this.apiService.handleListAll(request, response, "/apis");
  }

  private void do1Api(final HttpServletRequest request, final HttpServletResponse response,
    final String method, final List<String> paths) {
    final String apiIdOrName = paths.get(0);
    if (GET.equals(method)) {
      do1ApiGet(response, apiIdOrName);
    } else if (DELETE.equals(method)) {
      do1ApiDelete(response, apiIdOrName);
    } else if (PUT.equals(method)) {
      do1ApiUpdate(request, response, apiIdOrName);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  protected void do1ApiDelete(final HttpServletResponse response, final String apiName) {
    final String path = APIS_PATH + apiName;
    this.apiService.handleDelete(response, path);
    this.apiService.clearCachedObject(API, apiName);
  }

  protected void do1ApiGet(final HttpServletResponse response, final String apiId) {
    this.apiService.apiGet(response, apiId);
  }

  protected void do1ApiUpdate(final HttpServletRequest request, final HttpServletResponse response,
    final String apiName) {
    this.apiService.apiUpdate(request, response, apiName);
  }

  private void do2PluginList(final HttpServletRequest request, final HttpServletResponse response,
    final String method, final List<String> paths) {
    final String apiName = paths.get(0);
    if (GET.equals(method)) {
      do2PluginListGet(request, response, apiName);
    } else if (POST.equals(method)) {
      do2PluginListAdd(request, response, apiName);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  protected void do2PluginListAdd(final HttpServletRequest request,
    final HttpServletResponse response, final String apiName) {
    final String pluginAddPath = APIS_PATH + apiName + "/plugins";
    this.apiService.handleAdd(request, response, pluginAddPath);
  }

  protected void do2PluginListGet(final HttpServletRequest request,
    final HttpServletResponse response, final String apiId) {
    this.apiService.pluginList(request, response, "/plugins?api_id=" + apiId,
      row -> row.get("consumer_id") == null);
  }

  private void do3Plugin(final HttpServletRequest request, final HttpServletResponse response,
    final String method, final List<String> paths) {
    final String apiIdOrName = paths.get(0);
    final String pluginName = paths.get(2);
    if (DELETE.equals(method)) {
      do3PluginDelete(response, apiIdOrName, pluginName);
    } else if (PUT.equals(method)) {
      do3PluginUpdate(request, response, apiIdOrName, pluginName);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  protected void do3PluginDelete(final HttpServletResponse response, final String apiName,
    final String pluginName) {
    final String path = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
    this.apiService.handleDelete(response, path);
    this.apiService.clearCachedObject(API, apiName);
  }

  protected void do3PluginUpdate(final HttpServletRequest request,
    final HttpServletResponse response, final String apiName, final String pluginName) {
    final String updatePath = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
    this.apiService.handleUpdatePatch(request, response, updatePath, ApiServlet.PLUGIN_FIELD_NAMES);
    this.apiService.clearCachedObject(API, apiName);
  }

  private void do4UserGroupList(final HttpServletRequest request,
    final HttpServletResponse response, final List<String> paths) {
    final String apiName = paths.get(0);
    final String groupName = paths.get(2);
    this.apiService.endpointGroupUserList(request, response, apiName, groupName);
  }

  private void do5GroupUser(final HttpServletResponse response, final String method,
    final List<String> paths) {
    final String apiName = paths.get(0);
    final String groupName = paths.get(2);
    final String userName = paths.get(4);
    if (DELETE.equals(method)) {
      do5GroupUserDelete(response, apiName, groupName, userName);
    } else if (POST.equals(method)) {
      do5GroupUserAdd(response, apiName, groupName, userName);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }

  }

  private void do5GroupUserAdd(final HttpServletResponse response, final String apiName,
    final String groupName, final String userName) {
    this.apiService.apiGroupUserAdd(response, apiName, groupName, userName);
  }

  private void do5GroupUserDelete(final HttpServletResponse response, final String apiName,
    final String groupName, final String userName) {
    this.apiService.apiGroupUserDelete(response, apiName, groupName, userName);
  }

  @Override
  protected void doService(final HttpServletRequest request, final HttpServletResponse response,
    final String method) {
    final List<String> paths = splitPathInfo(request);
    final int pathCount = paths.size();
    if (pathCount == 0) {
      do0ApiList(request, response, method);
      return;
    } else if (pathCount == 1) {
      do1Api(request, response, method, paths);
      return;
    } else if (pathCount == 2) {
      final String path2 = paths.get(1);
      if (PLUGINS.equals(path2)) {
        do2PluginList(request, response, method, paths);
        return;
      }
    } else if (pathCount == 3) {
      final String path2 = paths.get(1);
      if (PLUGINS.equals(path2)) {
        do3Plugin(request, response, method, paths);
        return;
      }
    } else if (pathCount == 4) {
      if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
        do4UserGroupList(request, response, paths);
        return;
      }
    } else if (pathCount == 5 && GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
      do5GroupUser(response, method, paths);
      return;
    }
    sendError(response, HttpServletResponse.SC_NOT_FOUND);
  }
}
