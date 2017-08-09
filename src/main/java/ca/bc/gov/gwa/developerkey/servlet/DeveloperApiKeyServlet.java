package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.developerkey.servlet.github.GitHubPrincipal;
import ca.bc.gov.gwa.servlet.ApiService;
import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/apiKeys/*", loadOnStartup = 1)
public class DeveloperApiKeyServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> path = splitPathInfo(request);
    if (path.size() == 1) {
      final String apiKey = path.get(0);
      this.apiService.developerApiKeyDelete(request, response, apiKey);
    } else {
      sendError(response, HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    this.apiService.developerApiKeyList(request, response);
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    this.apiService.developerApiKeyAdd(request, response);
  }

  @Override
  protected void service(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    if (GitHubPrincipal.hasDeveloperRole(request)) {
      super.service(request, response);
    } else {
      response.setContentType(ApiService.APPLICATION_JSON);
      try (
        PrintWriter writer = response.getWriter()) {
        writer.print("{}");
      }
    }
  }
}
