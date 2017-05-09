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
        this.apiService.pluginNameList(response);
      break;
      case 1: {
        final String pluginName = paths.get(0);
        if ("_names".equals(pluginName)) {
          this.apiService.pluginNames(response);
        } else {
          this.apiService.pluginList(request, response, "/plugins?name=" + pluginName, null);
        }
      }
      break;
      case 2: {
        final String pluginName = paths.get(0);
        final String type = paths.get(1);
        if ("schema".equals(type)) {
          final String schemaPath = "/plugins/schema/" + pluginName;
          this.apiService.handleGet(request, response, schemaPath);
        }
      }
      break;
      default:
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
      break;
    }

  }

}
