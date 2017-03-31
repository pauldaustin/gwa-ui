package ca.bc.gov.gwa.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class BaseAdminServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void service(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    if (hasRole(request, response, ApiService.ROLE_GWA_ADMIN)) {
      super.service(request, response);
    }
  }

}
