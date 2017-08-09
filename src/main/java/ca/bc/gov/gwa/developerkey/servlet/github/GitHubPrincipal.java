package ca.bc.gov.gwa.developerkey.servlet.github;

import java.security.Principal;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import ca.bc.gov.gwa.servlet.BasePrincipal;

public class GitHubPrincipal extends BasePrincipal {
  private static final String DEVELOPER_ROLE = "gwa_github_developer";

  private static final long serialVersionUID = 1L;

  public static boolean hasDeveloperRole(final HttpServletRequest request) {
    final Principal userPrincipal = request.getUserPrincipal();
    if (userPrincipal instanceof GitHubPrincipal) {
      final GitHubPrincipal principal = (GitHubPrincipal)userPrincipal;
      return principal.isUserInRole(DEVELOPER_ROLE);
    }
    return false;
  }

  private final String login;

  public GitHubPrincipal(final String id, final String login, final String name,
    final Set<String> roles) {
    super(id, name, roles);
    this.login = login;
  }

  public void addDeveloperRole() {
    addRole(DEVELOPER_ROLE);
  }

  @Override
  public boolean equals(final Object object) {
    if (this == object) {
      return true;
    } else if (object instanceof GitHubPrincipal) {
      return super.equals(object);
    } else {
      return false;
    }
  }

  public String getLogin() {
    return this.login;
  }

  public boolean hasDeveloperRole() {
    return isUserInRole(DEVELOPER_ROLE);
  }

  @Override
  public int hashCode() {
    return super.hashCode();
  }
}
