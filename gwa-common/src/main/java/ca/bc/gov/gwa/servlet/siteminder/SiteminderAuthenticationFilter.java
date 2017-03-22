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
    final HttpServletRequest httpRequest = (HttpServletRequest)request;
    final HttpServletResponse httpResponse = (HttpServletResponse)response;
    try {
      if (request.getAttribute("siteminderFiltered") == null) {
        request.setAttribute("siteminderFiltered", Boolean.TRUE);

        final String userGuid = httpRequest.getHeader("smgov_userguid");
        final String universalid = httpRequest.getHeader("sm_universalid");
        final String type = httpRequest.getHeader("smgov_usertype");
        final String userDir = httpRequest.getHeader("sm_authdirname");
        if (userGuid == null || universalid == null) {
          httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN);
        } else {
          final HttpSession session = httpRequest.getSession();
          SiteminderPrincipal principal = (SiteminderPrincipal)session
            .getAttribute(SITEMINDER_PRINCIPAL);
          final String userId = userDir + ":" + userGuid;
          if (principal == null || principal.isInvalid(userId, 120000)) {
            final String username = userDir + ":" + universalid;

            final Set<String> groups;
            try {
              groups = this.apiService.consumerGroups(userId, username);
            } catch (final HttpHostConnectException e) {
              LoggerFactory.getLogger(getClass()).error("Unable to connect to KONG", e);
              httpResponse.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
              return;
            } catch (final Throwable e) {
              LoggerFactory.getLogger(getClass()).error("Error getting user's roles", e);
              httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
              return;
            }
            principal = new SiteminderPrincipal(userId, type, username, groups);
            session.setAttribute(SITEMINDER_PRINCIPAL, principal);
          }
          if (principal.isUserInRole("GWA_ADMIN") || principal.isUserInRole("GWA_API_OWNER")) {
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
    } catch (ServletException | IOException e) {
      throw e;
    } catch (final Throwable e) {
      LoggerFactory.getLogger(getClass()).error("Unknown error", e);
      httpResponse.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }

  @Override
  public void init(final FilterConfig filterConfig) throws ServletException {
    this.apiService = ApiService.get();
  }
}
