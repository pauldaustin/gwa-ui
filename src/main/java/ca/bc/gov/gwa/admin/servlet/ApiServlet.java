package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

      case 1: { // API
        final String apiName = paths.get(0);
        final String path = APIS_PATH + apiName;
        this.apiService.handleDelete(request, response, path);
        this.apiService.clearCachedObject(API, apiName);
      }
      break;

      case 2:
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      case 3: {
        final String apiName = paths.get(0);
        if (PLUGINS.equals(paths.get(1))) {
          final String pluginName = paths.get(2);
          final String path = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
          this.apiService.handleDelete(request, response, path);
          this.apiService.clearCachedObject(API, apiName);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;
      case 5: {
        final String apiName = paths.get(0);
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          final String groupName = paths.get(2);
          final String userName = paths.get(4);
          this.apiService.apiGroupUserDelete(request, response, apiName, groupName, userName);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: { // API List
        this.apiService.handleListAll(request, response, "/apis");
      }
      break;

      case 1: { // API Get
        final String apiId = paths.get(0);
        this.apiService.apiGet(request, response, apiId);

      }
      break;

      case 2: {
        final String apiId = paths.get(0);
        if (PLUGINS.equals(paths.get(1))) { // Plugin list
          this.apiService.pluginList(request, response, "/plugins?api_id=" + apiId, row -> {
            return row.get("consumer_id") == null;
          });
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      case 4: {
        final String apiName = paths.get(0);
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          final String groupName = paths.get(2);
          this.apiService.endpointGroupUserList(request, response, apiName, groupName);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: // API
        this.apiService.apiAdd(request, response);
      break;

      case 1:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 2: {
        final String apiName = paths.get(0);
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          final String pluginAddPath = APIS_PATH + apiName + "/plugins";
          this.apiService.handleAdd(request, response, pluginAddPath);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      case 3:
        if (PLUGINS.equals(paths.get(1))) {
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      break;
      case 5: {
        final String apiName = paths.get(0);
        if (GROUPS.equals(paths.get(1)) && USERS.equals(paths.get(3))) {
          final String groupName = paths.get(2);
          final String userName = paths.get(4);
          this.apiService.apiGroupUserAdd(request, response, apiName, groupName, userName);
        } else {
          sendError(response, HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 1: { // API
        final String apiName = paths.get(0);
        this.apiService.apiUpdate(request, response, apiName);
      }
      break;

      case 2: {
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      case 3: {
        final String apiName = paths.get(0);
        if (PLUGINS.equals(paths.get(1))) { // Plugin
          final String pluginName = paths.get(2);
          final String updatePath = APIS_PATH + apiName + PLUGINS_PATH + pluginName;
          this.apiService.handleUpdatePatch(request, response, updatePath,
            ApiServlet.PLUGIN_FIELD_NAMES);
          this.apiService.clearCachedObject(API, apiName);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;
      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }
}
