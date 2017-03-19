package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/rest/plugins/*", loadOnStartup = 1)
public class PluginServlet extends BaseAdminServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        this.apiService.pluginList(request, response);
      break;
      case 1: {
        final String apiName = paths.get(0);
        if ("_names".equals(apiName)) {
          this.apiService.pluginNameList(response);
        } else {
          response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;
      case 2: {
        final String apiName = paths.get(0);
        final String type = paths.get(1);
        if ("schema".equals(type)) {
          final String schemaPath = "/plugins/" + apiName;
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
