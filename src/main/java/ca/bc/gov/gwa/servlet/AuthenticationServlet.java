package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.util.Json;

@WebServlet(urlPatterns = "/rest/authentication", loadOnStartup = 1)
public class AuthenticationServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final Principal principal = request.getUserPrincipal();
    final Map<String, Object> data;
    if (principal instanceof BasePrincipal) {
      final BasePrincipal gwaPrincipal = (BasePrincipal)principal;
      data = gwaPrincipal.toMap();
    } else {
      data = Collections.emptyMap();
    }
    Json.writeJson(response, data);
  }
}
