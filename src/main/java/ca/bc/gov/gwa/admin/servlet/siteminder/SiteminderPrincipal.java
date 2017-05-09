package ca.bc.gov.gwa.admin.servlet.siteminder;

import java.util.Map;
import java.util.Set;

import ca.bc.gov.gwa.servlet.BasePrincipal;

public class SiteminderPrincipal extends BasePrincipal {
  private final String type;

  SiteminderPrincipal(final String id, final String type, final String name,
    final Set<String> roles) {
    super(id, name, roles);
    this.type = type;
  }

  public String getType() {
    return this.type;
  }

  @Override
  public Map<String, Object> toMap() {
    final Map<String, Object> map = super.toMap();
    map.put("type", this.type);
    return map;
  }
}
