package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class BaseServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  protected ApiService apiService;

  public BaseServlet() {
    super();
  }

  @Override
  public void destroy() {
    super.destroy();
    this.apiService = ApiService.release();
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
