package ca.bc.gov.gwa.developerkey.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.BaseServlet;

@WebServlet(urlPatterns = "/terms", loadOnStartup = 1)
public class TermsServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String termsUrl = BaseServlet.apiService.getConfig("gwaTermsUrl");
    sendRedirect(response, termsUrl);
  }
}
