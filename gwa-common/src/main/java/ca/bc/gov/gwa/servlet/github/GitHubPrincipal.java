package ca.bc.gov.gwa.servlet.github;

import java.security.Principal;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class GitHubPrincipal implements Principal {
  private final String id;

  private final String name;

  private final Set<String> roles;

  public GitHubPrincipal(final String id, final String name, final Set<String> roles) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    } else if (obj instanceof GitHubPrincipal) {
      final GitHubPrincipal principal = (GitHubPrincipal)obj;
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
        return GitHubPrincipal.this.name;
      }

      @Override
      public Principal getUserPrincipal() {
        return GitHubPrincipal.this;
      }

      @Override
      public boolean isUserInRole(final String role) {
        return GitHubPrincipal.this.isUserInRole(role);
      }
    };
  }

  @Override
  public String toString() {
    return this.name;
  }
}
