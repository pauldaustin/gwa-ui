package ca.bc.gov.gwa.servlet.siteminder;

import java.io.IOException;
import java.security.Principal;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

import ca.bc.gov.gwa.servlet.ApiService;

@WebFilter("/*")
public class SiteminderAuthenticationFilter implements Filter {

  private ApiService apiService;

  @Override
  public void destroy() {
    this.apiService = null;
  }

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response,
    final FilterChain chain) throws IOException, ServletException {
    final HttpServletRequest httpRequest = (HttpServletRequest)request;
    final String userId = httpRequest.getHeader("smgov_userguid");
    if (userId == null) {
      final HttpServletResponse httpResponse = (HttpServletResponse)response;
      httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
    } else {
      final String type = httpRequest.getHeader("smgov_usertype");
      final String userDir = httpRequest.getHeader("sm_authdirname");
      final String userName = httpRequest.getHeader("sm_universalid");
      final String name;
      if (userDir == null) {
        name = userName.replace('\\', ':');
      } else {
        name = userDir + ":" + userName;
      }
      final Set<String> roles = this.apiService.aclGet(userId, name);
      final SiteminderPrincipal principal = new SiteminderPrincipal(userId, type, name, roles);

      chain.doFilter(new HttpServletRequestWrapper(httpRequest) {
        @Override
        public String getRemoteUser() {
          return userName;
        }

        @Override
        public Principal getUserPrincipal() {
          return principal;
        }

        @Override
        public boolean isUserInRole(final String role) {
          return principal.isUserInRole(role);
        }
      }, response);
    }
  }

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    this.apiService = ApiService.get();
  }
}
