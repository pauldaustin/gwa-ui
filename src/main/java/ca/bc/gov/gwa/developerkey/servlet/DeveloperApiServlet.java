package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.developerkey.servlet.authentication.GitHubPrincipal;
import ca.bc.gov.gwa.servlet.ApiService;
import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/apis", loadOnStartup = 1)
public class DeveloperApiServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    if (GitHubPrincipal.hasDeveloperRole(request)) {
      this.apiService.developerApiList(request, response);
    } else {
      response.setContentType(ApiService.APPLICATION_JSON);
      try (
        PrintWriter writer = response.getWriter()) {
        writer.print("{}");
      }
    }
  }
}
