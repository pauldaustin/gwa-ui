package ca.bc.gov.gwa.servlet;

import java.io.Serializable;
import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class BasePrincipal implements Principal, Serializable {

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  private final String id;

  private final String name;

  private final Set<String> roles;

  private long timestamp = System.currentTimeMillis();

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

  public long getTimestamp() {
    return this.timestamp;
  }

  @Override
  public int hashCode() {
    return this.id.hashCode();
  }

  public boolean isExpired(final long timeInMillis) {
    final long time = System.currentTimeMillis();
    final long expireTime = this.timestamp + timeInMillis;
    return expireTime < time;
  }

  public boolean isInvalid(final String id, final long timeInMillis) {
    if (this.id.equals(id)) {
      return isExpired(timeInMillis);
    } else {
      return true;
    }
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

  public void refreshTimestamp() {
    this.timestamp = System.currentTimeMillis();
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
