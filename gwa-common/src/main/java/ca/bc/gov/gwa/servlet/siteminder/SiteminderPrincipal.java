package ca.bc.gov.gwa.servlet.siteminder;

import java.security.Principal;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class SiteminderPrincipal implements Principal {
  private final String id;

  private final String type;

  private final String name;

  private final Set<String> roles;

  SiteminderPrincipal(final String id, final String type, final String name,
    final Set<String> roles) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.roles = roles;
  }

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    } else if (obj instanceof SiteminderPrincipal) {
      final SiteminderPrincipal principal = (SiteminderPrincipal)obj;
      return this.id.equals(principal.id);
    } else {
      return false;
    }
  }

  public String getId() {
    return this.id;
  }

  @Override
  public String getName() {
    return this.name;
  }

  public String getType() {
    return this.type;
  }

  @Override
  public int hashCode() {
    return this.id.hashCode();
  }

  public boolean isUserInRole(final String role) {
    return this.roles.contains(role);
  }

  public HttpServletRequestWrapper newHttpServletRequestWrapper(
    final HttpServletRequest httpRequest) {
    return new HttpServletRequestWrapper(httpRequest) {
      @Override
      public String getRemoteUser() {
        return SiteminderPrincipal.this.name;
      }

      @Override
      public Principal getUserPrincipal() {
        return SiteminderPrincipal.this;
      }

      @Override
      public boolean isUserInRole(final String role) {
        return SiteminderPrincipal.this.isUserInRole(role);
      }
    };
  }

  @Override
  public String toString() {
    return this.name;
  }
}
