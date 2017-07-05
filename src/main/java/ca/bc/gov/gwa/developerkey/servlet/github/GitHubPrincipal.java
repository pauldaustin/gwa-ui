package ca.bc.gov.gwa.developerkey.servlet.github;

import java.util.Set;

import ca.bc.gov.gwa.servlet.BasePrincipal;

public class GitHubPrincipal extends BasePrincipal {
  /**
   *
   */
  private static final long serialVersionUID = 1L;

  public GitHubPrincipal(final String id, final String name, final Set<String> roles) {
    super(id, name, roles);
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

  @Override
  public int hashCode() {
    return super.hashCode();
  }
}
