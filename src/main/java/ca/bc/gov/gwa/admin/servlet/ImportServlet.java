package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import ca.bc.gov.gwa.util.Json;

@WebServlet(urlPatterns = "/int/rest/config/import", loadOnStartup = 1)
public class ImportServlet extends BaseAdminServlet {

  private static final long serialVersionUID = 1L;

  private void configImport(final Reader reader, final HttpServletResponse response)
    throws IOException {
    final Map<String, Object> result = this.apiService.configImport(reader);
    Json.writeJson(response, result);
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    if (ServletFileUpload.isMultipartContent(request)) {
      try {
        final ServletFileUpload upload = new ServletFileUpload();

        // Parse the request
        final FileItemIterator iter = upload.getItemIterator(request);
        while (iter.hasNext()) {
          final FileItemStream item = iter.next();
          final String name = item.getFieldName();
          if ("file".equals(name)) {
            try (
              InputStream stream = item.openStream();
              Reader reader = new InputStreamReader(stream)) {
              configImport(reader, response);
            }
          }
        }
      } catch (FileUploadException | IOException e) {
        this.apiService.writeJsonError(response, "Cannot read file", e);
      }
    } else {
      try (
        Reader reader = request.getReader()) {
        configImport(reader, response);
      }
    }
  }

}
