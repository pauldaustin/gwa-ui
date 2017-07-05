package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;

@WebServlet(urlPatterns = "/int/rest/nodes/*", loadOnStartup = 1)
public class NodeServlet extends BaseAdminServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String name = request.getParameter("name");
    if (name == null) {
      sendError(response, HttpServletResponse.SC_NOT_FOUND);
    } else {
      try {
        final String path = "/cluster?name=" + URLEncoder.encode(name, "UTF-8");
        this.apiService.handleDelete(response, path);
      } catch (final IOException e) {
        LoggerFactory.getLogger(getClass()).error("Unable to encode:" + name, e);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (isPathEmpty(pathInfo)) {
      this.apiService.handleListAll(request, response, "/cluster");
    } else {
      sendError(response, HttpServletResponse.SC_NOT_FOUND);
    }
  }
}
