package ca.bc.gov.gwa.servlet;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.LoggerFactory;

public class PluginFieldLayout {
  private static final String PLUGIN = "Plugin ";

  private static final String FIELDS = "fields";

  private final List<Map<String, Object>> groups = new ArrayList<>();

  private final Map<String, Map<String, Object>> groupByName = new HashMap<>();

  private final Set<String> allFieldNames = new HashSet<>();

  private final Set<String> unusedFieldNames;

  private final String pluginName;

  @SuppressWarnings("unchecked")
  public PluginFieldLayout(final String pluginName, final Map<String, Object> pluginSchema,
    final List<Map<String, Object>> groups) {
    this.pluginName = pluginName;
    addFieldName("", pluginSchema);
    this.unusedFieldNames = new HashSet<>(this.allFieldNames);
    getGroup("core");
    if (groups != null) {
      try {
        for (final Map<String, Object> groupDefinition : groups) {
          final String groupName = (String)groupDefinition.getOrDefault("name", "core");
          final Map<String, Object> group = getGroup(groupName);
          final String title = (String)groupDefinition.get("title");
          if (title != null) {
            group.put("title", title);
          }
          final List<List<String>> rows = (List<List<String>>)groupDefinition.getOrDefault(FIELDS,
            Collections.emptyList());
          for (final List<String> row : rows) {
            addRow(groupName, row);
          }
        }
      } catch (final Exception e) {
        LoggerFactory.getLogger(getClass()).error(PLUGIN + pluginName + " error parsing layout", e);
      }
    }
    for (final String fieldName : this.unusedFieldNames) {
      addField("core", fieldName);
    }
    pluginSchema.put("layout", this.groups);
  }

  @SuppressWarnings("unchecked")
  private void addField(final String groupName, final String fieldName) {
    final Map<String, Object> group = getGroup(groupName);
    final List<List<String>> rows = (List<List<String>>)group.get(FIELDS);
    rows.add(Collections.singletonList(fieldName));
  }

  @SuppressWarnings("unchecked")
  private void addFieldName(final String prefix, final Map<String, Object> schema) {
    final Map<String, Map<String, Object>> fields = (Map<String, Map<String, Object>>)schema
      .getOrDefault(FIELDS, Collections.emptyMap());
    for (final Entry<String, Map<String, Object>> entry : fields.entrySet()) {
      final String fieldName = entry.getKey();
      this.allFieldNames.add(prefix + fieldName);
      final Map<String, Object> field = entry.getValue();
      addFieldName(prefix + fieldName + ".", field);
    }
  }

  @SuppressWarnings("unchecked")
  private void addRow(final String groupName, final List<String> row) {
    if (row != null) {
      final List<String> rowFields = new ArrayList<>();
      for (final String fieldName : row) {
        if (this.allFieldNames.contains(fieldName)) {
          if (this.unusedFieldNames.remove(fieldName)) {
            rowFields.add(fieldName);
          } else {
            LoggerFactory.getLogger(getClass())
              .error(PLUGIN + this.pluginName + " field is used twice " + fieldName);
          }
        } else {
          LoggerFactory.getLogger(getClass())
            .error(PLUGIN + this.pluginName + " does not have the field " + fieldName);
        }
      }
      if (!rowFields.isEmpty()) {
        final Map<String, Object> group = getGroup(groupName);
        final List<List<String>> rows = (List<List<String>>)group.get(FIELDS);
        rows.add(rowFields);
      }
    }
  }

  private Map<String, Object> getGroup(final String groupName) {
    Map<String, Object> group = this.groupByName.get(groupName);
    if (group == null) {
      group = new LinkedHashMap<>();
      group.put("name", groupName);
      group.put(FIELDS, new ArrayList<>());
      this.groups.add(group);
      this.groupByName.put(groupName, group);
    }
    return group;
  }

  public List<Map<String, Object>> getGroups() {
    return this.groups;
  }
}
