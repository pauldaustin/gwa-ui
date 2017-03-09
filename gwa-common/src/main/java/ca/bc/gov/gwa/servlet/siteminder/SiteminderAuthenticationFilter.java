package ca.bc.gov.gwa.servlet.siteminder;

import java.io.IOException;
import java.util.Set;

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

import ca.bc.gov.gwa.servlet.ApiService;
import ca.bc.gov.gwa.util.Uuid;

public class SiteminderAuthenticationFilter implements Filter {

  private static final String SITEMINDER_PRINCIPAL = "SiteminderPrincipal";

  private ApiService apiService;

  @Override
  public void destroy() {
    this.apiService = ApiService.release();
  }

  @Override
  public void doFilter(final ServletRequest request, final ServletResponse response,
    final FilterChain chain) throws IOException, ServletException {
    if (request.getAttribute("siteminderFiltered") == null) {
      request.setAttribute("siteminderFiltered", Boolean.TRUE);
      final HttpServletRequest httpRequest = (HttpServletRequest)request;
      final HttpServletResponse httpResponse = (HttpServletResponse)response;
      final HttpSession session = httpRequest.getSession();

      String userId = httpRequest.getHeader("smgov_userguid");
      if (userId == null) {
        httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
      } else {
        SiteminderPrincipal principal = (SiteminderPrincipal)session
          .getAttribute(SITEMINDER_PRINCIPAL);
        if (principal == null || !principal.getId().equals(userId)) {

          final String type = httpRequest.getHeader("smgov_usertype");
          String userDir = httpRequest.getHeader("sm_authdirname");
          final String userName = httpRequest.getHeader("sm_universalid");
          final String name;
          if (userDir == null) {
            name = userName.replace('\\', ':');
            userDir = userName.substring(0, name.indexOf(':'));
            if (userId.indexOf('\\') != -1) {
              userId = userDir + ":" + Uuid.md5(userDir, name).toString();
            }
          } else {
            name = userDir + ":" + userName;
          }
          final Set<String> roles;
          try {
            roles = this.apiService.aclGet(userId, name);
          } catch (final HttpHostConnectException e) {
            httpResponse.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
            return;
          } catch (final Throwable e) {
            LoggerFactory.getLogger(getClass()).error("Error getting ACL", e);
            httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            return;
          }
          principal = new SiteminderPrincipal(userId, type, name, roles);
        }
        if (principal.isUserInRole("GWA_ADMIN") || principal.isUserInRole("GWA_USER")) {
          final HttpServletRequestWrapper requestWrapper = principal
            .newHttpServletRequestWrapper(httpRequest);
          chain.doFilter(requestWrapper, response);
        } else {
          httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
        }
      }
    } else {
      chain.doFilter(request, response);
    }
  }

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    this.apiService = ApiService.get();
  }
}
