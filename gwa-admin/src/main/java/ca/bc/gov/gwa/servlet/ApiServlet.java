package ca.bc.gov.gwa.servlet;

import java.io.IOException;
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
          final String pluginId = apiIdString.substring(slashIndex + 9);
          apiIdString = apiIdString.substring(0, slashIndex);

          this.apiService.pluginDelete(response, userId, apiIdString, pluginId);
          return;
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        final UUID apiId = UUID.fromString(apiIdString);
        this.apiService.apiDelete(response, userId, apiId);
      }
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.apiList(response, userId, true);
    } else if ("/my".equals(pathInfo)) {
      this.apiService.apiList(response, userId, false);
    } else {
      final String apiId = pathInfo.substring(1);
      this.apiService.apiGet(response, apiId);
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      this.apiService.apiCreate(request, response, userId);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      String apiIdString = pathInfo.substring(1);
      final int slashIndex = apiIdString.indexOf('/');
      if (slashIndex > -1) {
        if (apiIdString.startsWith("plugins", slashIndex + 1)) {
          apiIdString = apiIdString.substring(0, slashIndex);
          this.apiService.pluginAdd(request, response, userId, apiIdString);
        } else if (apiIdString.startsWith("apiKeys", slashIndex + 1)) {
          this.apiService.apiKeyCreate(request, response, userId, pathInfo);
        }
      }
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final String userId = request.getRemoteUser();
    final String pathInfo = request.getPathInfo();
    if (pathInfo == null || "/".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else if ("/my".equals(pathInfo)) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    } else {
      String apiIdString = pathInfo.substring(1);
      final int slashIndex = apiIdString.indexOf('/');
      if (slashIndex > -1) {
        if (apiIdString.startsWith("plugins/", slashIndex + 1)) {
          final String pluginId = apiIdString.substring(slashIndex + 9);
          apiIdString = apiIdString.substring(0, slashIndex);
          this.apiService.pluginUpdate(request, response, userId, apiIdString, pluginId);
        } else {
          response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        }
      } else {
        this.apiService.apiUpdate(request, response, userId, pathInfo);
      }
    }
  }
}
