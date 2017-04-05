package ca.bc.gov.gwa.servlet.github;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.UUID;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.conn.HttpHostConnectException;
import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.servlet.ApiService;
import ca.bc.gov.gwa.util.LruMap;

public class GitHubAuthenticationFilter implements Filter {

  private static final String GIT_HUB_PRINCIPAL = "GitHubPrincipal";

  private static final String GIT_HUB_STATE_URL_MAP = "GitHubStateUrlMap";

  private String clientId;

  private String clientSecret;

  private final Set<String> organizationRoles = new TreeSet<>(
    Arrays.asList("github_revolsys", "github_gwa-qa"));

  private ApiService apiService;

  @Override
  public void destroy() {
    this.apiService = ApiService.release();
  }

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response,
    final FilterChain chain) throws IOException, ServletException {
    if (request.getAttribute("gitFiltered") == null) {
      request.setAttribute("gitFiltered", Boolean.TRUE);
      final HttpServletRequest httpRequest = (HttpServletRequest)request;
      final HttpServletResponse httpResponse = (HttpServletResponse)response;
      final String servletPath = httpRequest.getServletPath();
      if ("/logout".equals(servletPath)) {
        final HttpSession session = httpRequest.getSession(false);
        if (session != null) {
          session.invalidate();
        }

        httpResponse.sendRedirect("https://github.com/logout");
      } else {
        final HttpSession session = httpRequest.getSession();

        final String fullPath = httpRequest.getServletPath();
        if (fullPath.equals("/git/callback")) {
          handleCallback(httpRequest, httpResponse, session);
        } else {
          final GitHubPrincipal principal = (GitHubPrincipal)session
            .getAttribute(GIT_HUB_PRINCIPAL);
          if (principal == null || principal.isExpired(120000)) {
            handleRedirectToGitHub(httpRequest, httpResponse, session);
          } else {
            for (final String role : this.organizationRoles) {
              if (principal.isUserInRole(role)) {
                final HttpServletRequestWrapper requestWrapper = principal
                  .newHttpServletRequestWrapper(httpRequest);
                chain.doFilter(requestWrapper, response);
                return;
              }
            }
            httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
          }
        }
      }
    } else {
      chain.doFilter(request, response);
    }
  }

  @SuppressWarnings("unchecked")
  private void handleCallback(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final HttpSession session) throws IOException {
    final Map<String, String> stateUrlMap = (Map<String, String>)session
      .getAttribute(GIT_HUB_STATE_URL_MAP);
    if (stateUrlMap != null) {
      final String state = httpRequest.getParameter("state");
      final String code = httpRequest.getParameter("code");
      final String redirectUrl = stateUrlMap.get(state);
      if (redirectUrl != null) {
        final String accessToken;
        try (
          JsonHttpClient client = new JsonHttpClient("https://github.com/")) {
          final Map<String, Object> accessResponse = client
            .get("/login/oauth/access_token?client_id=" + this.clientId + "&client_secret="
              + this.clientSecret + "&code=" + code + "&state=" + state);
          accessToken = (String)accessResponse.get("access_token");
        }
        try (
          JsonHttpClient client = new JsonHttpClient("https://api.github.com/")) {
          final Map<String, Object> userResponse = client.get("/user?access_token=" + accessToken);
          final Number id = (Number)userResponse.get("id");
          final String login = (String)userResponse.get("login");
          if (id != null && login != null) {
            final String userId = "github_" + id;
            final String userName = "github_" + login.toLowerCase();
            final Set<String> groups;
            try {
              groups = this.apiService.consumerGroups(userId, userName);
            } catch (final HttpHostConnectException e) {
              httpResponse.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
              return;
            } catch (final Throwable e) {
              LoggerFactory.getLogger(getClass()).error("Error getting ACL", e);
              httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
              return;
            }
            final Object orgResponse = client.get("/user/orgs?access_token=" + accessToken);
            if (orgResponse instanceof List) {
              final List<Map<String, Object>> orgList = (List<Map<String, Object>>)orgResponse;
              for (final Map<String, Object> organization : orgList) {
                final String role = (String)organization.get("login");
                if (role != null) {
                  groups.add("github_" + role.toLowerCase());
                }
              }
            }
            final GitHubPrincipal principal = new GitHubPrincipal(userId, userName, groups);
            session.setAttribute(GIT_HUB_PRINCIPAL, principal);
            httpResponse.sendRedirect(redirectUrl);
            return;
          }
        }
      }
    }
    httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
  }

  @SuppressWarnings("unchecked")
  public void handleRedirectToGitHub(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final HttpSession session) throws IOException {
    if (httpRequest.getServletPath().startsWith("/rest")) {
      httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
    } else {
      final String state = UUID.randomUUID().toString();
      Map<String, String> stateUrlMap = (Map<String, String>)session
        .getAttribute(GIT_HUB_STATE_URL_MAP);
      if (stateUrlMap == null) {
        stateUrlMap = new LruMap<>(10);
        session.setAttribute(GIT_HUB_STATE_URL_MAP, stateUrlMap);
      }

      final StringBuffer redirectBuilder = httpRequest.getRequestURL();
      redirectBuilder.indexOf("/pub/gwa");
      final String queryString = httpRequest.getQueryString();
      if (queryString != null) {
        redirectBuilder.append('?');
        redirectBuilder.append(queryString);
      }
      final String redirectUrl = redirectBuilder.toString();
      stateUrlMap.put(state, redirectUrl);
      final String authorizeUrl = "https://github.com/login/oauth/authorize?client_id="
        + this.clientId + "&scope=read:org&state=" + state;
      httpResponse.sendRedirect(authorizeUrl);
    }
  }

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    this.apiService = ApiService.get();
    this.clientId = this.apiService.getConfig("gwaGitHubClientId");
    this.clientSecret = this.apiService.getConfig("gwaGitHubClientSecret");
    if (this.clientId == null || this.clientSecret == null) {
      LoggerFactory.getLogger(getClass())
        .error("Missing gitHubClientId or gitHubClientSecret configuration");
    }
  }

}
