package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected static List<String> splitPath(final String path) {
    if (path == null || path.length() == 1) {
      return Collections.emptyList();
    } else {
      final List<String> paths = new ArrayList<>();
      int startIndex = 1;
      for (int endIndex = path.indexOf('/', startIndex); endIndex != -1; endIndex = path
        .indexOf('/', startIndex)) {
        if (endIndex - startIndex > 0) {
          final String part = path.substring(startIndex, endIndex);
          paths.add(part);
        }
        startIndex = endIndex + 1;
      }
      if (startIndex < path.length()) {
        final String part = path.substring(startIndex);
        paths.add(part);
      }
      return paths;
    }
  }

  protected static List<String> splitPathInfo(final HttpServletRequest request) {
    final String path = request.getPathInfo();
    final List<String> paths = splitPath(path);
    return paths;
  }

  protected ApiService apiService;

  public BaseServlet() {
    super();
  }

  @Override
  public void destroy() {
    super.destroy();
    this.apiService = ApiService.release();
  }

  public boolean hasPath(final String pathInfo) {
    return pathInfo == null || "/".equals(pathInfo);
  }

  protected boolean hasRole(final HttpServletRequest request, final HttpServletResponse response,
    final String roleName) throws IOException {
    final Principal userPrincipal = request.getUserPrincipal();
    if (userPrincipal instanceof BasePrincipal) {
      final BasePrincipal principal = (BasePrincipal)userPrincipal;
      if (principal.isUserInRole(roleName)) {
        return true;
      }
    }
    response.sendError(HttpServletResponse.SC_FORBIDDEN);
    return false;
  }

  @Override
  public void init() throws ServletException {
    super.init();
    this.apiService = ApiService.get();
  }

  @Override
  protected void service(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    try {
      final String methodOverride = request.getHeader("X-HTTP-Method-Override");
      if (methodOverride == null || !"POST".equals(request.getMethod())) {
        super.service(request, response);
      } else if ("DELETE".equals(methodOverride)) {
        doDelete(request, response);
      } else {
        super.service(request, response);
      }
    } catch (final Throwable e) {
      final Class<?> clazz = getClass();
      final Logger logger = LoggerFactory.getLogger(clazz);
      logger.error("Error handling request", e);
    }
  }

}
