package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/rest/organizations/_join", loadOnStartup = 1)
public class DeveloperOrgMembershipServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    this.apiService.gitHubAddOrganizationMember(request);
    this.apiService.writeJsonResponse(response, "added");
  }
}
