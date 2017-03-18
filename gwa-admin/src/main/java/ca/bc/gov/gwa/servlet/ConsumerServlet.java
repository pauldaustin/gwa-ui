package ca.bc.gov.gwa.servlet;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/rest/consumers/*", loadOnStartup = 1)
public class ConsumerServlet extends BaseAdminServlet {
  private static final long serialVersionUID = 1L;

  private static final List<String> CONSUMER_FIELD_NAMES = Arrays.asList("id", "username",
    "custom_id", "created_at");

  private static final List<String> CONSUMER_GROUP_ADD_FIELD_NAMES = Arrays.asList("consumer_id",
    "group");

  @Override
  protected void doDelete(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 1: { // Consumer
        final String username = paths.get(0);
        final String consumerPath = "/consumers/" + username;
        this.apiService.handleDelete(request, response, consumerPath);
      }
      break;

      case 0:
      case 2:
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 3: { // Group
        final String username = paths.get(0);
        if ("groups".equals(paths.get(1))) {
          final String groupId = paths.get(2);
          final String groupPath = "/consumers/" + username + "/acls/" + groupId;
          this.apiService.handleDelete(request, response, groupPath);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        this.apiService.handleList(request, response, "/consumers");
      break;

      case 1: { // Consumer
        final String username = paths.get(0);
        final String consumerPath = "/consumers/" + username;
        this.apiService.handleGet(request, response, consumerPath);
      }
      break;

      case 2:
        final String username = paths.get(0);
        if ("groups".equals(paths.get(1))) {
          final String groupsPath = "/consumers/" + username + "/acls";
          this.apiService.handleList(request, response, groupsPath);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0: // Consumer
        this.apiService.handleAdd(request, response, "/consumers/", CONSUMER_FIELD_NAMES);
      break;

      case 1:
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 2: // Groups
        final String username = paths.get(0);
        if ("groups".equals(paths.get(1))) {
          final String groupsPath = "/consumers/" + username + "/acls";
          this.apiService.handleAdd(request, response, groupsPath, CONSUMER_GROUP_ADD_FIELD_NAMES);
        } else {
          response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

  @Override
  protected void doPut(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    final List<String> paths = splitPathInfo(request);
    switch (paths.size()) {
      case 0:
        response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
      break;

      case 1: { // Consumer
        final String username = paths.get(0);
        this.apiService.handleUpdatePatch(request, response, "/consumers/" + username,
          CONSUMER_FIELD_NAMES);
      }
      break;

      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      break;
    }
  }

}
