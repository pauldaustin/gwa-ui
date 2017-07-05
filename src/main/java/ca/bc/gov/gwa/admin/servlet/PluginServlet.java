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
    switch (paths.size()) {
      case 0:
        doGetPluginNamesList(response);
      break;
      case 1:
        final String pluginName = paths.get(0);
        if ("_names".equals(pluginName)) {
          doGetPluginNames(response);
        } else {
          doGetPluginList(request, response, pluginName);
        }
      break;
      case 2:
        final String type = paths.get(1);
        if ("schema".equals(type)) {
          doGetPluginSchema(response, paths);
        }
      break;
      default:
        sendError(response, HttpServletResponse.SC_NOT_FOUND);
      break;
    }

  }

  private void doGetPluginList(final HttpServletRequest request, final HttpServletResponse response,
    final String pluginName) {
    this.apiService.pluginList(request, response, "/plugins?name=" + pluginName, null);
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
