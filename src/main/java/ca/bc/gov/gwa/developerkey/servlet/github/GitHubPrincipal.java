package ca.bc.gov.gwa.developerkey.servlet.github;

import java.util.Set;

import ca.bc.gov.gwa.servlet.BasePrincipal;

public class GitHubPrincipal extends BasePrincipal {
  public GitHubPrincipal(final String id, final String name, final Set<String> roles) {
    super(id, name, roles);
  }
}
