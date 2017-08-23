package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.ApiService;

@WebServlet(urlPatterns = "/int/rest/config/export", loadOnStartup = 1)
public class ExportServlet extends BaseAdminServlet {

  private static final long serialVersionUID = 1L;

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final Date date = new Date(System.currentTimeMillis());
    final String dateString = new SimpleDateFormat("yyyyMMDD-HHmmss").format(date);
    response.setContentType(ApiService.APPLICATION_JSON);
    if (!"false".equals(request.getParameter("download"))) {
      response.setHeader("Content-Disposition",
        "attachment; filename=kong-export-" + dateString + ".json");
    }
    try (
      Writer writer = response.getWriter()) {
      this.apiService.configExport(writer, date);
    }
  }

}
