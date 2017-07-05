package ca.bc.gov.gwa.developerkey.servlet.github;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.servlet.AbstractFilter;
import ca.bc.gov.gwa.util.LruMap;

@WebFilter(urlPatterns = {
  "/", "/git/*", "/logout", "/rest/*", "/ui/*"
})
public class GitHubAuthenticationFilter extends AbstractFilter {

  private static final String GITHUB = "github_";

  private static final String GIT_HUB_PRINCIPAL = "GitHubPrincipal";

  private static final String GIT_HUB_STATE_URL_MAP = "GitHubStateUrlMap";

  private String clientId;

  private String clientSecret;

  private String organizationRole;

  private void addGitHubGroups(final JsonHttpClient client, final String accessToken,
    final Set<String> groups) throws IOException {
    final Object orgResponse = client.get("/user/orgs?access_token=" + accessToken);
    if (orgResponse instanceof List) {
      final List<Map<String, Object>> orgList = (List<Map<String, Object>>)orgResponse;
      for (final Map<String, Object> organization : orgList) {
        final String role = (String)organization.get("login");
        if (role != null) {
          groups.add(GITHUB + role.toLowerCase());
        }
      }
    }
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
        doFilterLogout(httpRequest, httpResponse);
      } else {
        doFilterLogin(chain, httpRequest, httpResponse);
      }
    } else {
      chain.doFilter(request, response);
    }
  }

  private void doFilterLogin(final FilterChain chain, final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) throws IOException, ServletException {
    final HttpSession session = httpRequest.getSession();

    final String fullPath = httpRequest.getServletPath();
    if (fullPath.equals("/git/callback")) {
      handleCallback(httpRequest, httpResponse, session);
    } else {
      final GitHubPrincipal principal = (GitHubPrincipal)session.getAttribute(GIT_HUB_PRINCIPAL);
      if (principal == null || principal.isExpired(120000)) {
        handleRedirectToGitHub(httpRequest, httpResponse, session);
      } else {
        if (principal.isUserInRole(this.organizationRole)) {
          final HttpServletRequestWrapper requestWrapper = principal
            .newHttpServletRequestWrapper(httpRequest);
          chain.doFilter(requestWrapper, httpResponse);
        } else {
          sendError(httpResponse, HttpServletResponse.SC_FORBIDDEN);
        }
      }
    }
  }

  private void doFilterLogout(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    final HttpSession session = httpRequest.getSession(false);
    if (session != null) {
      session.invalidate();
    }

    sendRedirect(httpResponse, "https://github.com/logout");
  }

  private String getAccessToken(final String state, final String code) throws IOException {
    final String accessToken;
    try (
      JsonHttpClient client = new JsonHttpClient("https://github.com/")) {
      final Map<String, Object> accessResponse = client
        .get("/login/oauth/access_token?client_id=" + this.clientId + "&client_secret="
          + this.clientSecret + "&code=" + code + "&state=" + state);
      accessToken = (String)accessResponse.get("access_token");
    }
    return accessToken;
  }

  @SuppressWarnings("unchecked")
  private void handleCallback(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final HttpSession session) throws IOException {
    final LruMap<String, String> stateUrlMap = (LruMap<String, String>)session
      .getAttribute(GIT_HUB_STATE_URL_MAP);
    if (stateUrlMap != null) {
      final String state = httpRequest.getParameter("state");
      final String code = httpRequest.getParameter("code");
      final String redirectUrl = stateUrlMap.get(state);
      if (redirectUrl != null) {
        final String accessToken = getAccessToken(state, code);
        try (
          JsonHttpClient client = new JsonHttpClient("https://api.github.com/")) {
          final Map<String, Object> userResponse = client.get("/user?access_token=" + accessToken);
          final Number id = (Number)userResponse.get("id");
          final String login = (String)userResponse.get("login");
          if (id != null && login != null) {
            final String userId = GITHUB + id;
            final String userName = GITHUB + login.toLowerCase();
            final Set<String> groups = getGroups(httpResponse, userId, userName);
            if (groups == Collections.<String> emptySet()) {
              return;

            } else {
              addGitHubGroups(client, accessToken, groups);
              final GitHubPrincipal principal = new GitHubPrincipal(userId, userName, groups);
              session.setAttribute(GIT_HUB_PRINCIPAL, principal);
              sendRedirect(httpResponse, redirectUrl);
              return;
            }
          }
        }
      }
    }
    sendError(httpResponse, HttpServletResponse.SC_FORBIDDEN);
  }

  @SuppressWarnings("unchecked")
  public void handleRedirectToGitHub(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final HttpSession session) {
    if (httpRequest.getServletPath().startsWith("/rest")) {
      sendError(httpResponse, HttpServletResponse.SC_FORBIDDEN);
    } else {
      final String state = UUID.randomUUID().toString();
      LruMap<String, String> stateUrlMap = (LruMap<String, String>)session
        .getAttribute(GIT_HUB_STATE_URL_MAP);
      if (stateUrlMap == null) {
        stateUrlMap = new LruMap<>(10);
        session.setAttribute(GIT_HUB_STATE_URL_MAP, stateUrlMap);
      }

      final StringBuffer redirectBuilder = httpRequest.getRequestURL();
      final String queryString = httpRequest.getQueryString();
      if (queryString != null) {
        redirectBuilder.append('?');
        redirectBuilder.append(queryString);
      }
      final String redirectUrl = redirectBuilder.toString();
      stateUrlMap.put(state, redirectUrl);
      final String authorizeUrl = "https://github.com/login/oauth/authorize?client_id="
        + this.clientId + "&scope=read:org&state=" + state;
      sendRedirect(httpResponse, authorizeUrl);
    }
  }

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    super.init(filterConfig);
    this.organizationRole = GITHUB + this.apiService.getConfig("gwaGitHubOrganization", "gwa-qa");
    this.clientId = this.apiService.getConfig("gwaGitHubClientId");
    this.clientSecret = this.apiService.getConfig("gwaGitHubClientSecret");
    if (this.clientId == null || this.clientSecret == null) {
      LoggerFactory.getLogger(getClass())
        .error("Missing gitHubClientId or gitHubClientSecret configuration");
    }
  }

}
