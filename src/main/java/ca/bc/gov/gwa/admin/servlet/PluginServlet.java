package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/int/rest/plugins/*", loadOnStartup = 1)
public class PluginServlet extends BaseAdminServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    final int pathCount = paths.size();
    if (pathCount == 0) {
      doGetPluginNamesList(response);
      return;
    } else if (pathCount == 1) {
      final String pluginName = paths.get(0);
      if ("_names".equals(pluginName)) {
        doGetPluginNames(response);
      } else {
        doGetPluginList(request, response, pluginName);
      }
      return;
    } else if (pathCount == 2) {
      final String type = paths.get(1);
      if ("schema".equals(type)) {
        doGetPluginSchema(response, paths);
        return;
      }
    }
    sendError(response, HttpServletResponse.SC_NOT_FOUND);
  }

  private void doGetPluginList(final HttpServletRequest request, final HttpServletResponse response,
    final String pluginName) {
    String path = "/plugins?name=" + pluginName;
    this.apiService.pluginList(request, response, path, null);
  }

  private void doGetPluginNames(final HttpServletResponse response) {
    this.apiService.pluginNames(response);
  }

  private void doGetPluginNamesList(final HttpServletResponse response) {
    this.apiService.pluginNameList(response);
  }

  private void doGetPluginSchema(final HttpServletResponse response, final List<String> paths) {
    final String pluginName = paths.get(0);
    this.apiService.pluginSchemaGet(response, pluginName);
  }
}
