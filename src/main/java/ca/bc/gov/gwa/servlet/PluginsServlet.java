package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet(urlPatterns = "/rest/plugins/*", loadOnStartup = 1)
public class PluginsServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  private ApiService apiService;

  @Override
  public void destroy() {
    super.destroy();
    this.apiService = null;
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.pluginList(response);
    } else {
      this.apiService.pluginSchema(response, pathInfo.substring(1));
    }
  }

  @Override
  public void init() throws ServletException {
    super.init();
    this.apiService = ApiService.get();
  }

  @Override
  protected void service(final HttpServletRequest req, final HttpServletResponse resp)
    throws ServletException, IOException {
    try {
      super.service(req, resp);
    } catch (final Throwable e) {
      final Class<?> clazz = getClass();
      final Logger logger = LoggerFactory.getLogger(clazz);
      logger.error("Error handling request", e);
    }
  }
}
