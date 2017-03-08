package ca.bc.gov.gwa.servlet;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class BasePrincipal implements Principal {

  private final String id;

  private final String name;

  private final Set<String> roles;

  protected BasePrincipal(final String id, final String name, final Set<String> roles) {
    this.id = id;
    this.name = name;
    this.roles = roles;
  }

  @Override
  public boolean equals(final Object obj) {
    if (this == obj) {
      return true;
    } else if (obj instanceof BasePrincipal) {
      final BasePrincipal principal = (BasePrincipal)obj;
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
        return BasePrincipal.this.name;
      }

      @Override
      public Principal getUserPrincipal() {
        return BasePrincipal.this;
      }

      @Override
      public boolean isUserInRole(final String role) {
        return BasePrincipal.this.roles.contains(role);
      }
    };
  }

  public Map<String, Object> toMap() {
    final Map<String, Object> map = new LinkedHashMap<>();
    map.put("id", this.id);
    map.put("name", this.name);
    map.put("roles", this.roles);
    return map;
  }

  @Override
  public String toString() {
    return this.name;
  }

}
