package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/rest/apis/*", loadOnStartup = 1)
public class ApiServlet extends BaseServlet {
  private static final long serialVersionUID = 1L;

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      String apiIdString = pathInfo.substring(1);
      final int slashIndex = apiIdString.indexOf('/');
      if (slashIndex > -1) {
        if (apiIdString.startsWith("apiKeys/", slashIndex + 1)) {
          final String apiKeyIdString = apiIdString.substring(slashIndex + 9);
          apiIdString = apiIdString.substring(0, slashIndex);

          final UUID apiId = UUID.fromString(apiIdString);
          final UUID apiKeyId = UUID.fromString(apiKeyIdString);
          this.apiService.apiKeyDelete(response, userId, apiId, apiKeyId);
          return;
        } else if (apiIdString.startsWith("plugins/", slashIndex + 1)) {
          this.apiService.handleDelete(request, response, "/apis" + pathInfo);
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        this.apiService.handleDelete(request, response, pathInfo);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.handleList(request, response, "/apis");
      // this.apiService.apiList(response, userId, true);
    } else if ("/my".equals(pathInfo)) {
      this.apiService.apiList(response, userId, false);
    } else {
      final String apiId = pathInfo.substring(1);
      this.apiService.apiGet(request, response, apiId);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.apiAdd(request, response, userId);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      final String apiIdString = pathInfo.substring(1);
      final int slashIndex = apiIdString.indexOf('/');
      if (slashIndex > -1) {
        if (apiIdString.startsWith("plugins", slashIndex + 1)) {
          if (apiIdString.indexOf('/', slashIndex + 2) == -1) {
            this.apiService.handleAdd(request, response, "/apis" + pathInfo);
          } else {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
          }
        } else if (apiIdString.startsWith("apiKeys", slashIndex + 1)) {
          this.apiService.apiKeyCreate(request, response, userId, pathInfo);
        }
      }
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      final String apiIdString = pathInfo.substring(1);
      final int slashIndex = apiIdString.indexOf('/');
      if (slashIndex > -1) {
        if (apiIdString.startsWith("plugins/", slashIndex + 1)) {
          final String path = "/apis" + pathInfo;
          final String updatePath = path;
          this.apiService.handleUpdatePut(request, response, updatePath);
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        final String path = "/apis" + pathInfo;
        final List<String> fieldNames = this.apiService.getApiFieldNames();
        this.apiService.handleUpdatePatch(request, response, path, fieldNames);
        // this.apiService.apiUpdate(request, response, userId, pathInfo);
      }
    }
  }
}
