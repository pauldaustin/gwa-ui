package ca.bc.gov.gwa.admin.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import ca.bc.gov.gwa.http.HttpStatusException;
import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.servlet.GwaConstants;
import ca.bc.gov.gwa.util.Json;

@WebServlet(urlPatterns = "/int/rest/config/import", loadOnStartup = 1)
public class ImportServlet extends BaseAdminServlet implements GwaConstants {

  private class ObjectHolder {
    private Object value;

    @SuppressWarnings("unchecked")
    public <V> V getValue() {
      return (V)this.value;
    }

    public void setValue(final Object value) {
      this.value = value;
    }
  }

  public static final long serialVersionUID = 1L;

  public static boolean removeEmptyValue(final Object value) {
    if (value == null) {
      return true;
    } else if (value instanceof String) {
      final String stringValue = (String)value;
      if (stringValue.isEmpty()) {
        return true;
      }
    } else if (value instanceof Map) {
      @SuppressWarnings("unchecked")
      final Map<String, Object> mapValue = (Map<String, Object>)value;
      if (mapValue.isEmpty()) {
        return true;
      } else {
        removeEmptyValues(mapValue);
      }
    } else if (value instanceof List) {
      final List<?> listValue = (List<?>)value;
      if (listValue.isEmpty()) {
        return true;
      } else {
        for (final Iterator<?> listIterator = listValue.iterator(); listIterator.hasNext();) {
          final Object listItem = listIterator.next();
          if (removeEmptyValue(listItem)) {
            listIterator.remove();
          }
        }
        return listValue.isEmpty();
      }
    }
    return false;
  }

  public static void removeEmptyValues(final Map<String, Object> map) {
    final Set<Entry<String, Object>> entrySet = map.entrySet();
    for (final Iterator<Entry<String, Object>> entryIterator = entrySet.iterator(); entryIterator
      .hasNext();) {
      final Entry<String, Object> entry = entryIterator.next();
      final Object value = entry.getValue();
      if (removeEmptyValue(value)) {
        entryIterator.remove();
      }
    }
  }

  private void apiImport(final AtomicInteger index, final JsonHttpClient httpClient,
    final Map<String, Object> api, final Map<String, Map<String, String>> idMapByType,
    final List<Map<String, Object>> results, final Map<String, String> apiNameById)
    throws IOException {
    configImportRecord(index, httpClient, APIS, api, idMapByType, results, APIS_PATH, APIS_PATH,
      null, NAME);
    final String apiId = (String)api.get(ID);
    final String apiName = (String)api.get(NAME);
    apiNameById.put(apiId, apiName);
  }

  @SuppressWarnings("unchecked")
  public Map<String, Object> configImport(final Reader reader) throws IOException {
    final List<Map<String, Object>> results = new ArrayList<>();
    try (
      JsonHttpClient httpClient = this.apiService.newKongClient()) {
      final Map<String, Map<String, String>> idMapByType = new TreeMap<>();
      final Map<String, String> consumerLabelById = new HashMap<>();
      final Map<String, String> apiNameById = new HashMap<>();
      final Map<String, Object> config = Json.read(reader);
      final AtomicInteger index = new AtomicInteger(1);
      // APIS
      for (final Map<String, Object> api : (List<Map<String, Object>>)config.get(APIS)) {
        apiImport(index, httpClient, api, idMapByType, results, apiNameById);
      }

      // Consumers
      for (final Map<String, Object> consumer : (List<Map<String, Object>>)config.get(USERS)) {
        userImport(index, httpClient, consumer, idMapByType, results, consumerLabelById);
      }

      // Plugins
      for (final Map<String, Object> plugin : (List<Map<String, Object>>)config.get(PLUGINS)) {
        pluginImport(index, httpClient, plugin, idMapByType, results, consumerLabelById,
          apiNameById);
      }
    }
    final Map<String, Object> result = new LinkedHashMap<>();
    result.put("total", results.size());
    result.put("data", results);
    return result;
  }

  private void configImport(final Reader reader, final HttpServletResponse response)
    throws IOException {
    final Map<String, Object> result = configImport(reader);
    Json.writeJson(response, result);
  }

  private String configImportRecord(final AtomicInteger index, final JsonHttpClient httpClient,
    final String type, final Map<String, Object> typeConfig,
    final Map<String, Map<String, String>> idMapByType, final List<Map<String, Object>> results,
    final String pathPrefix, final String uiPathPrefix, final String labelPrefix,
    final String... keyNames) throws IOException {
    final String primaryKeyName = keyNames[0];
    final Map<String, Object> newConfig = getNewConfig(typeConfig, idMapByType);
    final String originalId = (String)newConfig.remove(ID);
    if (newConfig.isEmpty()) {
      return null;
    } else {
      final String key = (String)newConfig.getOrDefault(primaryKeyName, originalId);
      String label = key;
      if (labelPrefix != null) {
        label = labelPrefix + " : " + label;
      }
      String uiPath = getPath(uiPathPrefix, key);
      try {
        for (final String keyName : keyNames) {
          final String currentKey = (String)typeConfig.get(keyName);
          if (currentKey != null) {
            final String path = pathPrefix + "/" + currentKey;
            final Map<String, Object> kongConfig = this.apiService.kongGet(httpClient, path);
            if (kongConfig != null) {
              removeEmptyValues(kongConfig);
              final String kongId = getId(type, kongConfig, idMapByType, originalId);
              typeConfig.put(ID, kongId);
              label = currentKey;
              if (labelPrefix != null) {
                label = labelPrefix + " : " + label;
              }
              configImportResultChanged(results, index, type, uiPath, label, newConfig, kongConfig);
              return currentKey;
            }
          }
        }
        uiPath = null;
        label = key;
        if (labelPrefix != null) {
          label = labelPrefix + " : " + label;
        }
        final Map<String, Object> kongConfig = httpClient.post(pathPrefix, newConfig);
        final String kongId = (String)kongConfig.get(ID);
        typeConfig.put(ID, kongId);
        label = (String)kongConfig.getOrDefault(primaryKeyName, kongId);
        if (labelPrefix != null) {
          label = labelPrefix + " : " + label;
        }
        uiPath = getPath(uiPathPrefix, key);

        configImportResultInsert(results, index, type, uiPath, label, kongConfig);
        return label;
      } catch (final HttpStatusException e) {
        configImportResultError(results, index, type, uiPath, label, newConfig, e);
        return null;
      }
    }
  }

  private void configImportResultChanged(final List<Map<String, Object>> results,
    final AtomicInteger index, final String type, final String path, final String label,
    final Map<String, Object> newConfig, final Map<String, Object> kongConfig) {
    final Set<String> fieldNames = new HashSet<>(newConfig.keySet());
    fieldNames.addAll(kongConfig.keySet());
    fieldNames.remove(ID);
    fieldNames.remove(CREATED_AT);
    final List<String> changedFieldNames = new ArrayList<>();
    final List<Object> oldValues = new ArrayList<>();
    final List<Object> newValues = new ArrayList<>();
    for (final String fieldName : fieldNames) {
      final Object oldValue = kongConfig.get(fieldName);
      final Object newValue = newConfig.get(fieldName);
      boolean changed = false;
      if (oldValue == null) {
        changed = newValue != null;
      } else {
        changed = !oldValue.equals(newValue);
      }
      if (changed) {
        changedFieldNames.add(fieldName);
        oldValues.add(oldValue);
        newValues.add(newValue);
      }
    }
    final Map<String, Object> result = new LinkedHashMap<>();
    result.put(INDEX, index.getAndIncrement());
    result.put(TYPE, type);
    result.put(PATH, path);
    result.put(ITEM, label);
    if (changedFieldNames.isEmpty()) {
      result.put(RESULT, "Matched");
    } else {
      result.put(RESULT, "Ignore - Changed Values");
      result.put("changedFieldNames", changedFieldNames);
      result.put("oldValues", oldValues);
      result.put("newValues", newValues);
    }
    result.put(CONFIG, newConfig);
    results.add(result);
  }

  private void configImportResultError(final List<Map<String, Object>> results,
    final AtomicInteger index, final String type, final String path, final String label,
    final Map<String, Object> newConfig, final HttpStatusException e) {

    final Map<String, Object> result = new LinkedHashMap<>();
    result.put(INDEX, index.getAndIncrement());
    result.put(TYPE, type);
    result.put(PATH, path);
    result.put(ITEM, label);
    result.put(RESULT, "Ignore - Error");
    result.put("error", e.getCode() + "-" + e.getMessage());
    result.put("request", e.getHttpRequest());
    final String body = e.getBody();
    result.put("body", body);

    result.put(CONFIG, newConfig);

    results.add(result);
  }

  private void configImportResultInsert(final List<Map<String, Object>> results,
    final AtomicInteger index, final String type, final String path, final String label,
    final Map<String, Object> savedConfig) {
    removeEmptyValues(savedConfig);
    final Map<String, Object> result = new LinkedHashMap<>();
    result.put(INDEX, index.getAndIncrement());
    result.put(TYPE, type);
    result.put(PATH, path);
    result.put(ITEM, label);
    result.put(RESULT, "Inserted");
    result.put(CONFIG, savedConfig);
    results.add(result);
  }

  @Override
  protected void doPost(final HttpServletRequest request, final HttpServletResponse response)
    throws ServletException, IOException {
    if (ServletFileUpload.isMultipartContent(request)) {
      try {
        final ServletFileUpload upload = new ServletFileUpload();

        // Parse the request
        final FileItemIterator iter = upload.getItemIterator(request);
        while (iter.hasNext()) {
          final FileItemStream item = iter.next();
          final String name = item.getFieldName();
          if ("file".equals(name)) {
            try (
              InputStream stream = item.openStream();
              Reader reader = new InputStreamReader(stream)) {
              configImport(reader, response);
            }
          }
        }
      } catch (FileUploadException | IOException e) {
        this.apiService.writeJsonError(response, "Cannot read file", e);
      }
    } else {
      try (
        Reader reader = request.getReader()) {
        configImport(reader, response);
      }
    }
  }

  private String getId(final String type, final Map<String, Object> config,
    final Map<String, Map<String, String>> idMapByType, final String id) {
    if (config == null) {
      return null;
    } else {
      final String idKong = (String)config.get(ID);
      if (idKong != null) {
        Map<String, String> idMap = idMapByType.get(type);
        if (idMap == null) {
          idMap = new HashMap<>();
          idMapByType.put(type, idMap);
        }
        idMap.put(id, idKong);
      }
      return idKong;
    }
  }

  private Map<String, Object> getNewConfig(final Map<String, Object> typeConfig,
    final Map<String, Map<String, String>> idMapByType) {
    final Map<String, Object> newConfig = new LinkedHashMap<>(typeConfig);
    newConfig.remove(CREATED_AT);
    removeEmptyValues(newConfig);
    for (final Entry<String, Object> entry : newConfig.entrySet()) {
      final String name = entry.getKey();
      if (name.endsWith("_id")) {
        final String idType = name.substring(0, name.length() - 3) + "s";
        final Map<String, String> idMap = idMapByType.get(idType);
        if (idMap != null) {
          final String referencedId = (String)entry.getValue();
          final String newReferencedId = idMap.get(referencedId);
          if (newReferencedId != null) {
            entry.setValue(newReferencedId);
          }
        }
      }
    }
    return newConfig;
  }

  private String getPath(final String prefix, final String suffix) {
    if (prefix == null) {
      return null;
    } else {
      return prefix + "/" + suffix;
    }
  }

  private void pluginImport(final AtomicInteger index, final JsonHttpClient httpClient,
    final Map<String, Object> pluginConfig, final Map<String, Map<String, String>> idMapByType,
    final List<Map<String, Object>> results, final Map<String, String> consumerLabelById,
    final Map<String, String> apiNameById) throws IOException {
    String apiId = (String)pluginConfig.get(API_ID);
    final Map<String, String> apiIdMap = idMapByType.get(APIS);
    if (apiIdMap != null) {
      apiId = apiIdMap.getOrDefault(apiId, apiId);
    }
    final String apiName = apiNameById.getOrDefault(apiId, apiId);
    final String pathPrefix = APIS_PATH2 + apiName + "/plugins";
    final Map<String, Object> newConfig = getNewConfig(pluginConfig, idMapByType);
    final String id = (String)newConfig.remove(ID);
    final String consumerId = (String)pluginConfig.get(CONSUMER_ID);

    final String pluginName = (String)pluginConfig.get(NAME);
    String label = apiName + " : " + pluginName;
    final String uiPath;
    String type = PLUGINS;
    if (consumerId == null) {
      uiPath = pathPrefix + "/" + pluginName;
    } else {
      final String consumerLabel = consumerLabelById.get(consumerId);
      uiPath = pathPrefix + "/" + pluginName + "/users/" + consumerLabel;
      label += " : " + consumerLabel;
      type += " : user";
    }
    try {
      final ObjectHolder kongConfigHolder = new ObjectHolder();

      this.apiService.kongPageAll(httpClient, pathPrefix, kongPluginConfig -> {
        final Object kongConsumerId = kongPluginConfig.get(CONSUMER_ID);

        if (consumerId == null) {
          if (kongConsumerId != null) {
            return;
          }
        } else {
          if (!consumerId.equals(kongConsumerId)) {
            return;
          }
        }
        final Object kongPluginName = kongPluginConfig.get(NAME);
        if (pluginName.equals(kongPluginName)) {
          removeEmptyValues(kongPluginConfig);
          kongConfigHolder.setValue(kongPluginConfig);
        }
      });

      Map<String, Object> kongConfig = kongConfigHolder.getValue();
      if (kongConfig == null) {
        kongConfig = httpClient.post(pathPrefix, newConfig);
        configImportResultInsert(results, index, type, uiPath, label, kongConfig);
      } else {
        configImportResultChanged(results, index, type, uiPath, label, newConfig, kongConfig);
      }
      getId(type, kongConfig, idMapByType, id);
    } catch (final HttpStatusException e) {
      configImportResultError(results, index, type, uiPath, label, newConfig, e);
    }
  }

  private void userDataImport(final AtomicInteger index, final JsonHttpClient httpClient,
    final Map<String, Map<String, String>> idMapByType, final List<Map<String, Object>> results,
    final String consumerLabel, final Map<String, List<Map<String, Object>>> userData)
    throws IOException {
    if (userData != null) {
      for (final String dataName : userData.keySet()) {
        for (final Map<String, Object> dataConfig : userData.get(dataName)) {
          final String pluginPathPrefix = CONSUMERS_PATH2 + consumerLabel + "/" + dataName;
          final String pluginUiPathPrefix = USERS_PATH + "/" + consumerLabel + "/data/" + dataName;
          final String typeLabel = USERS + " : data : " + dataName;
          if (BASIC_AUTH.equals(dataName)) {
            configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
              pluginPathPrefix, pluginUiPathPrefix, consumerLabel, USERNAME);
          } else if (HMAC_AUTH.equals(dataName)) {
            configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
              pluginPathPrefix, pluginUiPathPrefix, consumerLabel, USERNAME_CUSTOM_ID);
          } else if (JWT.equals(dataName)) {
            configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
              pluginPathPrefix, pluginUiPathPrefix, consumerLabel, USERNAME_CUSTOM_ID);
          } else if (KEY_AUTH.equals(dataName)) {
            configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
              pluginPathPrefix, pluginUiPathPrefix, consumerLabel, KEY);
          } else if (OAUTH2.equals(dataName)) {
            configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
              pluginPathPrefix, pluginUiPathPrefix, consumerLabel, USERNAME_CUSTOM_ID);
          }
        }
      }
    }
  }

  private void userGroupImport(final AtomicInteger index, final JsonHttpClient httpClient,
    final Map<String, Map<String, String>> idMapByType, final List<Map<String, Object>> results,
    final String userId, final String consumerLabel, final List<String> groupNames)
    throws IOException {
    if (groupNames != null) {
      for (final String groupName : groupNames) {
        final Map<String, Object> dataConfig = new LinkedHashMap<>();
        dataConfig.put(GROUP, groupName);
        dataConfig.put(CONSUMER_ID, userId);
        final String pluginPathPrefix = CONSUMERS_PATH2 + consumerLabel + "/acls";
        final String pluginUiPathPrefix = USERS_PATH + "/" + consumerLabel + "/groups";
        final String typeLabel = USERS + " : group";
        configImportRecord(index, httpClient, typeLabel, dataConfig, idMapByType, results,
          pluginPathPrefix, pluginUiPathPrefix, consumerLabel, GROUP);

      }
    }
  }

  @SuppressWarnings("unchecked")
  private void userImport(final AtomicInteger index, final JsonHttpClient httpClient,
    final Map<String, Object> userConfig, final Map<String, Map<String, String>> idMapByType,
    final List<Map<String, Object>> results, final Map<String, String> consumerLabelById)
    throws IOException {
    final Map<String, List<Map<String, Object>>> userData = (Map<String, List<Map<String, Object>>>)userConfig
      .remove(GwaConstants.DATA);
    final List<String> groupNames = (List<String>)userConfig.remove(GROUPS);
    final String consumerLabel = configImportRecord(index, httpClient, USERS, userConfig,
      idMapByType, results, CONSUMERS_PATH, USERS_PATH, null, USERNAME_CUSTOM_ID);
    if (consumerLabel != null) {
      final String userId = (String)userConfig.get(ID);
      consumerLabelById.put(userId, consumerLabel);
      userDataImport(index, httpClient, idMapByType, results, consumerLabel, userData);
      userGroupImport(index, httpClient, idMapByType, results, userId, consumerLabel, groupNames);
    }
  }

}
