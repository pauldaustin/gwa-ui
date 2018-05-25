package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/rateLimit/*", loadOnStartup = 1)
public class DeveloperApiRateLimitServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> path = splitPathInfo(request);
    if (path.size() == 1) {
      final String apiName = path.get(0);
      this.apiService.developerApiRateLimitGet(request, response, apiName);
    } else {
      sendError(response, HttpServletResponse.SC_NOT_FOUND);
    }
  }
}
