package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/int/rest/nodes/*", loadOnStartup = 1)
public class NodeServlet extends BaseAdminServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String name = request.getParameter("name");
    if (name == null) {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    } else {
      final String path = "/cluster?name=" + URLEncoder.encode(name, "UTF-8");
      this.apiService.handleDelete(request, response, path);
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (isPathEmpty(pathInfo)) {
      this.apiService.handleList(request, response, "/cluster");
    } else {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
    }
  }
}
