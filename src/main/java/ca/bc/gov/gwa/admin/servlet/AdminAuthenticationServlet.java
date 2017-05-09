package ca.bc.gov.gwa.admin.servlet;

import javax.servlet.annotation.WebServlet;

import ca.bc.gov.gwa.servlet.AuthenticationServlet;

@WebServlet(urlPatterns = "/int/rest/authentication", loadOnStartup = 1)
public class AdminAuthenticationServlet extends AuthenticationServlet {
  private static final long serialVersionUID = 1L;

}
