package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;

@WebServlet(urlPatterns = "/error/503/*", loadOnStartup = 1)
public class ServiceUnavailableServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void service(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    try {
      response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Service Unavailable");
    } catch (final Exception e) {
      LoggerFactory.getLogger(getClass()).debug("Unable to send status", e);
    }
  }
}
