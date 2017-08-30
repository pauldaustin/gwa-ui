package ca.bc.gov.gwa.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.function.Consumer;
import java.util.function.Predicate;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.conn.HttpHostConnectException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ca.bc.gov.gwa.admin.servlet.siteminder.SiteminderPrincipal;
import ca.bc.gov.gwa.developerkey.servlet.github.GitHubPrincipal;
import ca.bc.gov.gwa.http.HttpStatusException;
import ca.bc.gov.gwa.http.JsonHttpClient;
import ca.bc.gov.gwa.http.JsonHttpConsumer;
import ca.bc.gov.gwa.http.JsonHttpFunction;
import ca.bc.gov.gwa.util.CaseConverter;
import ca.bc.gov.gwa.util.Json;
import ca.bc.gov.gwa.util.LruMap;

@WebListener
public class ApiService implements ServletContextListener {

  private static final String ACL = "acl";

  private static final String ACLS_PATH = "/acls";

  private static final String API_ID = "api_id";

  private static final String API_OWNERS = "api_owners";

  private static final String API_SERVICE_NAME = ApiService.class.getName();

  private static final String APIS_PATH2 = "/apis/";

  public static final String APPLICATION_JSON = "application/json";

  private static final String BCGOV_GWA_ENDPOINT = "bcgov-gwa-endpoint";

  private static final String CONFIG = "config";

  private static final String CONSUMER_ID = "consumer_id";

  private static final String CONSUMERS_PATH = "/consumers";

  private static final String CONSUMERS_PATH2 = "/consumers/";

  private static final String CUSTOM_ID = "custom_id";

  private static final String DATA = "data";

  private static final String DELETED = "deleted";

  private static final String ENABLED = "enabled";

  private static final Map<String, Object> ENDPOINT_DEFAULT_CONFIG = Collections
    .singletonMap("allow_developer_keys", false);

  private static final List<String> ENDPOINT_FIELD_NAMES = Arrays.asList(API_OWNERS);

  private static final List<String> ENDPOINT_RATE_LIMIT_FIELD_NAMES = Arrays.asList("second",
    "hour", "minute", "day", "month", "year");

  private static final String FIELDS = "fields";

  private static final String GROUP = "group";

  private static final String HOSTS = "hosts";

  private static final String ID = "id";

  private static final String KEY_AUTH = "key-auth";

  private static final List<String> KEY_AUTH_FIELD_NAMES = Arrays.asList("key_names",
    "hide_credentials", "anonymous");

  private static final String KONG_SERVER_NOT_AVAILABLE = "Kong server not available";

  private static final String KONG_SERVER_RETURNED_AN_ERROR = "Kong server returned an error";

  private static final Logger LOG = LoggerFactory.getLogger(ApiService.class);

  private static final String NAME = "name";

  private static final String NEXT = "next";

  private static final List<String> API_SORT_FIELDS = Arrays.asList("api_name", NAME,
    "consumer_username");

  @SuppressWarnings("unchecked")
  private static final Comparator<Map<String, Object>> PLUGIN_COMPARATOR = (row1, row2) -> {
    for (final String fieldName : API_SORT_FIELDS) {
      final Comparable<Object> value1 = (Comparable<Object>)row1.get(fieldName);
      final Object value2 = row2.get(fieldName);
      if (value1 == null) {
        if (value2 != null) {
          return 1;
        }
      } else if (value2 == null) {
        return -1;
      } else {
        final int compare = value1.compareTo(value2);
        if (compare != 0) {
          return compare;
        }
      }
    }
    return 0;
  };

  private static final String PLUGINS = "plugins";

  private static final String PLUGINS_PATH = "/plugins";

  private static final String PLUGINS_PATH2 = "/plugins/";

  public static final String ROLE_GWA_ADMIN = "gwa_admin";

  public static final String ROLE_GWA_API_OWNER = "gwa_api_owner";

  private static final String TOTAL = "total";

  private static final String UNKNOWN_APPLICATION_ERROR = "Unknown application error";

  private static final String UPDATED = "updated";

  private static final String USERNAME = "username";

  private static final String VALUES = "values";

  private static final String WHITELIST = "whitelist";

  private static final List<String> ACL_FIELD_NAMES = Arrays.asList(WHITELIST);

  private static final List<String> APIS_FIELD_NAMES = Arrays.asList(ID, "created_at",
    "upstream_url", "preserve_host", NAME, HOSTS, "uris", "methods", "strip_uri", "retries",
    "upstream_connect_timeout", "upstream_send_timeout", "upstream_read_timeout", "https_only",
    "http_if_terminated");

  public static ApiService get(final ServletContext servletContext) {
    return (ApiService)servletContext.getAttribute(API_SERVICE_NAME);
  }

  private String gitHubAccessToken;

  private String gitHubClientId;

  private String gitHubClientSecret;

  private final Map<String, String> apiNameById = new LruMap<>(1000);

  private boolean caching;

  private final Map<String, Object> config = new HashMap<>();

  private String kongAdminPassword = null;

  private String kongAdminUrl = "http://localhost:8001";

  private String kongAdminUsername = null;

  private final Map<String, Map<String, Map<String, Object>>> objectByTypeAndId = new HashMap<>();

  private final Map<String, Map<String, Object>> pluginSchemaByName = new HashMap<>();

  private final Map<String, String> usernameByConsumerId = new LruMap<>(1000);

  private String version;

  private String gitHubOrganizationRole;

  private String gitHubOrganizationName;

  private void addData(final Map<String, Object> data, final Map<String, Object> requestData,
    final List<String> fieldNames) {
    for (final String key : fieldNames) {
      if (requestData.containsKey(key)) {
        final Object value = requestData.get(key);
        if (value == null) {
          data.remove(key);
        } else {
          data.put(key, value);
        }
      }
    }
  }

  public void apiAdd(final HttpServletRequest httpRequest, final HttpServletResponse httpResponse) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
    } else {
      handleRequest(httpResponse, httpClient -> {
        final Map<String, Object> apiRequest = getMap(requestData, APIS_FIELD_NAMES);
        final Map<String, Object> apiResponse = httpClient.post("/apis", apiRequest);
        final String apiId = (String)apiResponse.get(ID);
        if (apiId != null) {
          apiAddPlugin(httpClient, requestData, apiId, BCGOV_GWA_ENDPOINT, ENDPOINT_FIELD_NAMES,
            ENDPOINT_DEFAULT_CONFIG, false);
          apiAddPlugin(httpClient, requestData, apiId, KEY_AUTH, KEY_AUTH_FIELD_NAMES, null, true);
          apiAddPlugin(httpClient, requestData, apiId, ACL, ACL_FIELD_NAMES, null, true);
        }
        Json.writeJson(httpResponse, apiResponse);
      });
    }
  }

  @SuppressWarnings("unchecked")
  private void apiAddPlugin(final JsonHttpClient client, final Map<String, Object> requestData,
    final String apiId, final String pluginName, final List<String> fieldNames,
    final Map<String, Object> defaultConfig, final boolean ignoreDisabled) {
    final Map<String, Object> pluginAdd = pluginGet(requestData, pluginName);
    try {
      Map<String, Object> config;
      if (pluginAdd == null) {
        if (ignoreDisabled || defaultConfig == null) {
          return;
        } else {
          config = defaultConfig;
        }
      } else {
        if (ignoreDisabled && Boolean.TRUE != pluginAdd.get(ENABLED)) {
          return;
        } else {
          final Map<String, Object> configAdd = (Map<String, Object>)pluginAdd.get(CONFIG);
          config = new LinkedHashMap<>();
          addData(config, configAdd, fieldNames);
        }
      }

      final String path = APIS_PATH2 + apiId + PLUGINS_PATH;
      final Map<String, Object> plugin = new LinkedHashMap<>();
      plugin.put(NAME, pluginName);
      plugin.put(CONFIG, config);
      client.post(path, plugin);
    } catch (final Exception e) {
      logError("Error adding api " + apiId + " plugin " + pluginName + ":\n" + pluginAdd, e);
    }
  }

  private Map<String, String> apiAllNamesById(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient) throws IOException {
    final Map<String, String> namesById = new HashMap<>();
    final String path = "/apis";
    kongPageAll(httpRequest, httpClient, path, api -> {
      final String apiId = (String)api.get(ID);
      final String name = (String)api.get(NAME);
      namesById.put(apiId, name);
    });
    return namesById;
  }

  public void apiGet(final HttpServletResponse httpResponse, final String apiName) {
    final Map<String, Object> api = apiGet(apiName);
    if (api == null) {
      sendError(httpResponse, HttpServletResponse.SC_NOT_FOUND);
    } else {
      Json.writeJson(httpResponse, api);
    }
  }

  @SuppressWarnings("unchecked")
  public Map<String, Object> apiGet(final String apiName) {
    try {
      return getCachedObject("api", apiName, httpClient -> {
        final Map<String, Object> apiResponse = httpClient.get(APIS_PATH2 + apiName);
        final String apiId = (String)apiResponse.get(ID);
        if (apiId == null) {
          return null;
        } else {
          fixHostsMapToList(apiResponse);
          final Map<String, Object> pluginsResponse = httpClient
            .get(APIS_PATH2 + apiId + PLUGINS_PATH);
          final List<Map<String, Object>> plugins = getList(pluginsResponse, DATA);
          final Map<String, Map<String, Object>> pluginByName = new TreeMap<>();
          for (final Map<String, Object> plugin : plugins) {
            if (plugin.get(CONSUMER_ID) == null) {
              final String name = (String)plugin.get(NAME);
              final Map<String, Object> config = (Map<String, Object>)plugin.get(CONFIG);
              fixMapToList(config);
              pluginByName.put(name, plugin);
            }
          }
          apiResponse.put(PLUGINS, pluginByName);
          return apiResponse;
        }
      });
    } catch (final Exception e) {
      LOG.debug("Unable to get API:" + apiName, e);
      throw new IllegalStateException("Error getting API: " + apiName, e);
    }
  }

  private String apiGetName(final JsonHttpClient httpClient, final String apiId) {
    String apiName = this.apiNameById.get(apiId);
    if (apiName == null) {
      apiName = apiId;
      try {
        final Map<String, Object> api = httpClient.get(APIS_PATH2 + apiId);
        apiName = (String)api.get(NAME);
        if (apiName != null && this.caching) {
          this.apiNameById.put(apiId, apiName);
        }
      } catch (final Exception e) {
        LOG.error("Unable to get API:" + apiId, e);
        return "";
      }
    }
    return apiName;
  }

  public void apiGroupUserAdd(final HttpServletResponse httpResponse, final String apiName,
    final String groupName, final String userName) {
    final boolean hasGroup = endpointHasGroupEdit(apiName, groupName);
    if (hasGroup) {
      groupUserAdd(httpResponse, userName, groupName);
    } else {
      sendError(httpResponse, HttpServletResponse.SC_NOT_FOUND);
    }
  }

  public void apiGroupUserDelete(final HttpServletResponse httpResponse, final String apiName,
    final String groupName, final String userName) {
    final boolean hasGroup = endpointHasGroupEdit(apiName, groupName);
    if (hasGroup) {
      groupUserDelete(httpResponse, userName, groupName);
    } else {
      writeJsonResponse(httpResponse, DELETED);
    }
  }

  public void apiUpdate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiId) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
    } else {
      handleRequest(httpResponse, httpClient -> {
        String oldApiName = this.apiNameById.get(apiId);
        if (oldApiName == null) {
          oldApiName = (String)requestData.get(NAME);
        }
        try {
          final Map<String, Object> apiRequest = getMap(requestData, APIS_FIELD_NAMES);
          final Map<String, Object> apiResponse = httpClient.patch(APIS_PATH2 + apiId, apiRequest);
          if (apiId != null) {
            if (pluginGet(requestData, BCGOV_GWA_ENDPOINT) == null) {
              apiAddPlugin(httpClient, requestData, apiId, BCGOV_GWA_ENDPOINT, ENDPOINT_FIELD_NAMES,
                ENDPOINT_DEFAULT_CONFIG, false);
            } else {
              apiUpdatePlugin(httpClient, requestData, apiId, BCGOV_GWA_ENDPOINT,
                ENDPOINT_FIELD_NAMES);
            }
            apiUpdatePlugin(httpClient, requestData, apiId, KEY_AUTH, KEY_AUTH_FIELD_NAMES);
            apiUpdatePlugin(httpClient, requestData, apiId, ACL, ACL_FIELD_NAMES);
          }
          Json.writeJson(httpResponse, apiResponse);
        } finally {
          clearCachedObject("api", oldApiName);
        }
      });
    }
  }

  @SuppressWarnings("unchecked")
  private void apiUpdatePlugin(final JsonHttpClient client, final Map<String, Object> requestData,
    final String apiId, final String pluginName, final List<String> fieldNames) throws IOException {
    final Map<String, Object> pluginUpdate = pluginGet(requestData, pluginName);
    if (pluginUpdate != null) {

      final Map<String, Object> plugin = new LinkedHashMap<>();
      final String pluginId = (String)pluginUpdate.get(ID);

      final boolean enabled = Boolean.TRUE == pluginUpdate.get(ENABLED);
      plugin.put(ENABLED, enabled);

      plugin.put(NAME, pluginName);

      final Map<String, Object> configAdd = (Map<String, Object>)pluginUpdate.get(CONFIG);
      final Map<String, Object> config = new LinkedHashMap<>();
      addData(config, configAdd, fieldNames);
      plugin.put(CONFIG, config);

      if (pluginId == null) {
        if (enabled) {
          final String path = APIS_PATH2 + apiId + PLUGINS_PATH;
          client.post(path, plugin);
        }
      } else {
        if (enabled) {
          final String path = APIS_PATH2 + apiId + PLUGINS_PATH2 + pluginId;
          client.patch(path, plugin);
        } else {
          final String path = APIS_PATH2 + apiId + PLUGINS_PATH2 + pluginId;
          client.delete(path);
        }
      }
    }

  }

  public void clearCachedObject(final String type, final String id) {
    final Map<String, Map<String, Object>> objectById = this.objectByTypeAndId.get(type);
    if (objectById != null) {
      objectById.remove(id);
    }
  }

  protected Map<String, Object> consumerGet(final JsonHttpClient httpClient, final String filter)
    throws IOException {
    final Map<String, Object> consumerResponse = httpClient.get(filter);
    final List<Map<String, Object>> consumers = getList(consumerResponse, DATA);
    if (consumers.isEmpty()) {
      return Collections.emptyMap();
    } else {
      return consumers.get(0);
    }
  }

  private String consumerGetUsername(final JsonHttpClient httpClient, final String consumerId) {
    String username = this.usernameByConsumerId.get(consumerId);
    if (username == null) {
      username = consumerId;
      try {
        final Map<String, Object> consumerResponse = httpClient.get(CONSUMERS_PATH2 + consumerId);
        username = (String)consumerResponse.get(USERNAME);
        if (username != null) {
          this.usernameByConsumerId.put(consumerId, username);
        }
      } catch (final Exception e) {
        LOG.debug("Unable to find user:" + consumerId, e);
        return null;
      }
    }
    return username;
  }

  public void consumerGroupAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String username) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
    } else {
      final String groupName = (String)requestData.get(GROUP);
      groupUserAdd(httpResponse, username, groupName);
    }
  }

  private Set<String> consumerGroups(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient) throws IOException {
    final String username = httpRequest.getRemoteUser();
    final Set<String> groups = new HashSet<>();
    final String path = CONSUMERS_PATH2 + username + ACLS_PATH;
    kongPageAll(httpRequest, httpClient, path, acl -> {
      final String groupName = (String)acl.get(GROUP);
      groups.add(groupName);
    });
    return groups;
  }

  public Set<String> consumerGroups(final String customId, final String username)
    throws IOException {
    final Set<String> roles = new TreeSet<>();
    try (
      JsonHttpClient httpClient = newKongClient()) {
      final String customIdFilter = "/consumers/?custom_id=" + customId;
      Map<String, Object> consumer = consumerGet(httpClient, customIdFilter);
      if (consumer.isEmpty()) {
        final String usernameFilter = "/consumers/?username=" + username;
        consumer = consumerGet(httpClient, usernameFilter);
      } else {
        // Update if username changed
        if (!username.equals(consumer.get(USERNAME))) {
          final String id = (String)consumer.get(ID);
          consumer.put(USERNAME, username);
          httpClient.patch(CONSUMERS_PATH2 + id, consumer);
        }
      }
      if (consumer.isEmpty()) {
        // Create if consumer doesn't exist
        consumer = new HashMap<>();
        consumer.put(CUSTOM_ID, customId);
        consumer.put(USERNAME, username);
        consumer = httpClient.put(CONSUMERS_PATH, consumer);
      } else {
        // Update if custom_id changed
        if (!customId.equals(consumer.get(CUSTOM_ID))) {
          final String id = (String)consumer.get(ID);
          consumer.put(CUSTOM_ID, customId);
          httpClient.patch(CONSUMERS_PATH2 + id, consumer);
        }
      }
      final String id = (String)consumer.get(ID);

      this.usernameByConsumerId.put(id, username);
      final String groupsPath = CONSUMERS_PATH2 + id + ACLS_PATH;
      final Map<String, Object> groupsResponse = httpClient.get(groupsPath);
      final List<Map<String, Object>> groupList = getList(groupsResponse, DATA);
      for (final Map<String, Object> groupRecord : groupList) {
        final String group = (String)groupRecord.get(GROUP);
        roles.add(group);
      }
    }
    return roles;
  }

  /**
   * True if list2 contains any value from list 1.
   *
   * @param list1
   * @param list2
   * @return
   */
  private boolean containsAny(final List<String> list1, final Set<String> list2) {
    if (list1 != null) {
      for (final String value : list1) {
        if (list2.contains(value)) {
          return true;
        }
      }
    }
    return false;
  }

  @Override
  public void contextDestroyed(final ServletContextEvent event) {
    this.apiNameById.clear();
  }

  @Override
  public void contextInitialized(final ServletContextEvent event) {
    try {
      readProperties();
      this.kongAdminUrl = getConfig("gwaKongAdminUrl", this.kongAdminUrl);
      this.kongAdminUsername = getConfig("gwaKongAdminUsername", this.kongAdminUsername);
      this.kongAdminPassword = getConfig("gwaKongAdminPassword", this.kongAdminPassword);
      this.gitHubOrganizationName = getConfig("gwaGitHubOrganization", "gwa-qa");
      this.gitHubOrganizationRole = "github_" + this.gitHubOrganizationName;
      this.gitHubAccessToken = getConfig("gwaGitHubAccessToken");
      this.gitHubClientId = getConfig("gwaGitHubClientId");
      this.gitHubClientSecret = getConfig("gwaGitHubClientSecret");
      if (this.gitHubClientId == null || this.gitHubClientSecret == null) {
        LoggerFactory.getLogger(getClass())
          .error("Missing gitHubClientId or gitHubClientSecret configuration");
      }
      final ServletContext servletContext = event.getServletContext();
      servletContext.setAttribute(API_SERVICE_NAME, this);
    } catch (final Exception e) {
      LOG.error("Unable to initialize service", e);
      throw e;
    }
  }

  /**
   * Delete all existing API keys and create a new one.
   *
   * @param httpRequest
   * @param httpResponse
  
   */
  public void developerApiKeyAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final String userId = httpRequest.getRemoteUser();
      final String keyAuthPath = CONSUMERS_PATH2 + userId + "/key-auth";
      final Map<String, Object> apiKeyResponse = httpClient.post(keyAuthPath,
        Collections.emptyMap());
      Json.writeJson(httpResponse, apiKeyResponse);
    });

  }

  /**
   * Delete all existing API keys and create a new one.
   *
   * @param httpRequest
   * @param httpResponse
  
   */
  public void developerApiKeyDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiKey) {
    final String userId = httpRequest.getRemoteUser();
    final String path = CONSUMERS_PATH2 + userId + "/key-auth/" + apiKey;
    handleDelete(httpResponse, path);
  }

  /**
   * Delete all existing API keys and create a new one.
   *
   * @param httpRequest
   * @param httpResponse
  
   */
  public void developerApiKeyDeleteAll(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final String userId = httpRequest.getRemoteUser();
      final String keyAuthPath = CONSUMERS_PATH2 + userId + "/key-auth";
      kongPageAll(httpRequest, httpClient, keyAuthPath, apiKey -> {
        final String id = (String)apiKey.get(ID);
        try {
          httpClient.delete(keyAuthPath + "/" + id);
        } catch (final Exception e) {
          final String message = "Unable to delete " + keyAuthPath + "/" + id;
          logError(message, e);
        }
      });
      writeJsonResponse(httpResponse, "deleted");
    });

  }

  public void developerApiKeyList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {

      final String username = httpRequest.getRemoteUser();
      final String keyAuthPath = CONSUMERS_PATH2 + username + "/key-auth";
      final Map<String, Object> keyAuthResponse = httpClient.get(keyAuthPath);
      final List<Map<String, Object>> keyAuthList = getList(keyAuthResponse, DATA);

      final Map<String, Object> kongResponse = new LinkedHashMap<>();
      final List<Map<String, Object>> apiKeys = new ArrayList<>();
      for (final Map<String, Object> keyAuth : keyAuthList) {
        final String id = (String)keyAuth.get("id");
        final String key = (String)keyAuth.get("key");
        final Map<String, Object> apiKey = new LinkedHashMap<>();
        apiKey.put("id", id);
        apiKey.put("key", key);
        apiKeys.add(apiKey);
      }
      kongResponse.put(DATA, apiKeys);
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  @SuppressWarnings("unchecked")
  public void developerApiList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, String> apiAllNamesById = apiAllNamesById(httpRequest, httpClient);

      final Set<String> groups = consumerGroups(httpRequest, httpClient);

      final Map<String, Map<String, Object>> apiByName = new TreeMap<>();
      final String path = "/plugins?name=acl";
      kongPageAll(httpRequest, httpClient, path, acl -> {
        if (acl.get(CONSUMER_ID) == null) {
          final Map<String, Object> config = (Map<String, Object>)acl.get(CONFIG);
          final List<String> blacklist = getList(config, "blacklist");
          final List<String> whitelist = getList(config, WHITELIST);
          if (containsAny(blacklist, groups)) {
            // Ignore blacklist
          } else if (whitelist.isEmpty() || containsAny(whitelist, groups)) {
            final String apiId = (String)acl.get(API_ID);
            final String apiName = apiAllNamesById.get(apiId);
            apiByName.put(apiName, Collections.singletonMap("name", apiName));
          }
        }
      });

      final Map<String, Object> kongResponse = new LinkedHashMap<>();
      kongResponse.put(DATA, apiByName.values());
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public boolean endpointAccessAllowed(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final List<String> paths) {
    if (paths.isEmpty()) {
      return true;
    } else {
      final SiteminderPrincipal principal = (SiteminderPrincipal)httpRequest.getUserPrincipal();
      if (principal.isUserInRole(ROLE_GWA_ADMIN)) {
        return true;
      } else {
        return endpointAccessAllowedApiOwner(httpResponse, paths, principal);
      }

    }
  }

  @SuppressWarnings("unchecked")
  private boolean endpointAccessAllowedApiOwner(final HttpServletResponse httpResponse,
    final List<String> paths, final SiteminderPrincipal principal) {
    final String endpointName = paths.get(0);
    final Map<String, Object> api = apiGet(endpointName);
    if (api != null) {
      final String username = principal.getName();
      final Map<String, Object> endPoint = pluginGet(api, BCGOV_GWA_ENDPOINT);
      if (endPoint != null) {
        final Map<String, Object> config = (Map<String, Object>)endPoint.get(CONFIG);
        final List<String> apiOwners = getList(config, API_OWNERS);
        if (apiOwners.contains(username)) {
          return true;
        }
      }
    }
    sendError(httpResponse, HttpServletResponse.SC_NOT_FOUND);
    return false;
  }

  @SuppressWarnings("unchecked")
  public void endpointDelete(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String endpointId) {
    handleRequest(httpResponse, httpClient -> {
      final String endpointPath = PLUGINS_PATH + endpointId;
      try {
        final Map<String, Object> endpoint = httpClient.get(endpointPath);
        final String apiId = (String)endpoint.get(API_ID);
        final Map<String, Object> endpointConfig = (Map<String, Object>)endpoint.get(CONFIG);
        final BasePrincipal principal = (BasePrincipal)httpRequest.getUserPrincipal();
        final String userId = principal.getName();
        final String endpointUserId = (String)endpointConfig.get("created_by");
        if (principal.isUserInRole(ROLE_GWA_ADMIN) || userId.equals(endpointUserId)) {
          final String apiDeletePath = APIS_PATH2 + apiId;
          httpClient.delete(apiDeletePath);
          writeJsonResponse(httpResponse, DELETED);
        } else {
          writeJsonError(httpResponse, "You do not have permission to delete endpoint");
        }
      } catch (final HttpStatusException e) {
        if (e.getCode() == 404) {
          writeJsonResponse(httpResponse, DELETED);
        } else {
          throw e;
        }
      }
    });
  }

  public void endpointGroupUserList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String apiName, final String groupName) {
    final boolean hasGroup = endpointHasGroup(apiName, groupName);
    if (hasGroup) {
      final String groupPath = "/groups/" + groupName;
      groupUserList(httpRequest, httpResponse, groupPath);
    } else {
      sendError(httpResponse, HttpServletResponse.SC_NOT_FOUND);
    }
  }

  /**
   * Check if the endpoint has the group in the api_groups. Ignore groups that start with github_ or idir_.
   *
   * @param apiName
   * @param groupName
   * @return
  
   */
  @SuppressWarnings("unchecked")
  private boolean endpointHasGroup(final String apiName, final String groupName) {
    try {
      final Map<String, Object> api = apiGet(apiName);
      if (api != null) {
        final Map<String, Object> aclPlugin = pluginGet(api, ACL);
        if (aclPlugin != null) {
          final Map<String, Object> config = (Map<String, Object>)aclPlugin.getOrDefault(CONFIG,
            Collections.emptyMap());
          final List<String> apiGroups = getList(config, WHITELIST);
          return apiGroups.contains(groupName);
        }
      }
      return false;
    } catch (final Exception e) {
      LOG.debug("Unable to find group:" + groupName, e);
      return false;
    }
  }

  /**
   * Check if the endpoint has the group in the api_groups. Ignore groups that start with github_ or idir_.
   *
   * @param apiName
   * @param groupName
   * @return
  
   */
  private boolean endpointHasGroupEdit(final String apiName, final String groupName) {
    if (endpointHasGroup(apiName, groupName)) {
      return !(groupName.startsWith("github") || groupName.startsWith("idir"));
    }
    return false;
  }

  @SuppressWarnings("unchecked")
  public void endpointList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final SiteminderPrincipal principal = (SiteminderPrincipal)httpRequest.getUserPrincipal();
      final String path = "/plugins?name=bcgov-gwa-endpoint";
      final Map<String, Object> kongResponse;
      if (principal.isUserInRole(ROLE_GWA_ADMIN)) {
        kongResponse = kongPageAll(httpRequest, httpClient, path);
      } else {
        final String username = principal.getName();
        kongResponse = kongPageAll(httpRequest, httpClient, path, endpoint -> {
          final Map<String, Object> config = (Map<String, Object>)endpoint.get(CONFIG);
          final List<String> apiOwners = getList(config, API_OWNERS);
          return apiOwners.contains(username);
        });
      }
      final Map<String, Object> response = endpointListFromApiList(httpClient, kongResponse);
      Json.writeJson(httpResponse, response);
    });
  }

  private Map<String, Object> endpointListFromApiList(final JsonHttpClient httpClient,
    final Map<String, Object> kongResponse) {
    final List<Map<String, Object>> apiRows = new ArrayList<>();
    final List<Map<String, Object>> data = getList(kongResponse, DATA);
    for (final Map<String, Object> endpoint : data) {
      final String apiId = (String)endpoint.get(API_ID);
      final String apiName = apiGetName(httpClient, apiId);
      final Map<String, Object> api = apiGet(apiName);
      if (api != null) {
        final Map<String, Object> apiRow = new LinkedHashMap<>();
        for (final String fieldName : Arrays.asList(ID, NAME, "created_at", HOSTS, "uris")) {
          final Object values = api.get(fieldName);
          apiRow.put(fieldName, values);
        }
        apiRows.add(apiRow);
      }
    }
    return newResponseRows(apiRows);
  }

  @SuppressWarnings("unchecked")
  private boolean endPointSetKongParameters(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final Map<String, Object> apiRequest,
    final List<Map<String, Object>> pluginRequests) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      writeJsonError(httpResponse, "Missing JSON request body");
      return false;
    } else {
      addData(apiRequest, requestData, APIS_FIELD_NAMES);
      final Map<String, Map<String, Object>> plugins = (Map<String, Map<String, Object>>)requestData
        .get(PLUGINS);
      for (final Map<String, Object> plugin : plugins.values()) {
        final String pluginName = (String)plugin.get(NAME);
        Map<String, Object> pluginConfig = null;
        if ("rate-limiting".equals(pluginName)) {
          pluginConfig = endPointSetPluginRateLimiting(plugin);
        }
        if (pluginConfig != null) {
          final Map<String, Object> pluginRequest = new LinkedHashMap<>();
          final String id = (String)plugin.get(ID);
          pluginRequest.put(ID, id);
          pluginRequest.put(NAME, pluginName);
          pluginRequest.put(CONFIG, pluginConfig);
          pluginRequests.add(pluginRequest);
        }
      }
      return true;
    }
  }

  protected Map<String, Object> endPointSetPluginRateLimiting(
    final Map<String, Object> pluginUpdate) {
    @SuppressWarnings("unchecked")
    final Map<String, Object> configUpdate = (Map<String, Object>)pluginUpdate.get(CONFIG);

    final Map<String, Object> pluginConfig = new LinkedHashMap<>();
    addData(pluginConfig, configUpdate, ENDPOINT_RATE_LIMIT_FIELD_NAMES);
    pluginConfig.put("limit_by", "consumer");
    return pluginConfig;
  }

  public void endpointUpdate(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> apiRequest = new LinkedHashMap<>();
      final List<Map<String, Object>> pluginRequests = new ArrayList<>();

      if (endPointSetKongParameters(httpRequest, httpResponse, apiRequest, pluginRequests)) {
        final String apiId = (String)apiRequest.remove(ID);
        final String apiPath = APIS_PATH2 + apiId;
        final Map<String, Object> apiResponse = httpClient.patch(apiPath, apiRequest);
        if (apiId != null) {
          for (final Map<String, Object> pluginRequest : pluginRequests) {
            final String pluginId = (String)pluginRequest.remove(ID);
            if (pluginId == null) {
              final String pluginPath = apiPath + PLUGINS_PATH;
              httpClient.post(pluginPath, pluginRequest);
            } else {
              final String pluginPath = apiPath + PLUGINS_PATH2 + pluginId;
              httpClient.patch(pluginPath, pluginRequest);
            }
          }
        }
        Json.writeJson(httpResponse, apiResponse);
      }
    });
  }

  private void fixHostsMapToList(final Map<String, Object> apiResponse) {
    for (final String fieldName : Arrays.asList("uris", HOSTS)) {
      final Object value = apiResponse.get(fieldName);
      if (value instanceof Map) {
        final Map<?, ?> mapValue = (Map<?, ?>)value;
        if (mapValue.isEmpty()) {
          apiResponse.put(fieldName, new ArrayList<>());
        }
      }
    }
  }

  private void fixMapToList(final Map<String, Object> config) {
    for (final Entry<String, Object> entry : config.entrySet()) {
      final Object value = entry.getValue();
      if (value instanceof Map) {
        final Map<?, ?> mapValue = (Map<?, ?>)value;
        if (mapValue.isEmpty()) {
          entry.setValue(new ArrayList<>());
        }
      }
    }
  }

  private Map<String, Object> getCachedObject(final String type, final String id,
    final JsonHttpFunction action) throws IOException {
    final Map<String, Map<String, Object>> objectById = getObjectById(type);
    Map<String, Object> object = objectById.get(id);
    if (object == null) {
      try (
        JsonHttpClient httpClient = newKongClient()) {
        object = action.apply(httpClient);
      }
      if (this.caching) {
        objectById.put(id, object);
      }
    }
    return object;
  }

  public String getConfig(final String name) {
    return getConfig(name, null);
  }

  public String getConfig(final String name, final String defaultValue) {
    String value = null;
    value = System.getProperty(name);
    if (value == null) {
      value = (String)this.config.get(name);
    }
    if (value == null) {
      return defaultValue;
    } else {
      return value;
    }
  }

  protected Map<String, Object> getCustomSchema(final String pluginName) {
    if (this.pluginSchemaByName.containsKey(pluginName)) {
      return this.pluginSchemaByName.get(pluginName);
    } else {
      try (
        InputStream in = getClass()
          .getResourceAsStream("/ca/bc/gov/gwa/kong/plugins/" + pluginName + ".json")) {
        Map<String, Object> customSchema;
        if (in == null) {
          customSchema = Collections.emptyMap();
        } else {
          customSchema = Json.read(new InputStreamReader(in, StandardCharsets.UTF_8));
        }
        this.pluginSchemaByName.put(pluginName, customSchema);
        return customSchema;
      } catch (final IOException e) {
        logError("Unable to read custom schema:" + pluginName, e);
        return Collections.emptyMap();
      }
    }
  }

  public String getGitHubAccessToken(final String state, final String code) throws IOException {
    final String accessToken;
    try (
      JsonHttpClient client = new JsonHttpClient("https://github.com")) {
      final Map<String, Object> accessResponse = client
        .get("/login/oauth/access_token?client_id=" + this.gitHubClientId + "&client_secret="
          + this.gitHubClientSecret + "&code=" + code + "&state=" + state);
      accessToken = (String)accessResponse.get("access_token");
    }
    return accessToken;
  }

  public String getGitHubClientId() {
    return this.gitHubClientId;
  }

  public String getGitHubOrganizationRole() {
    return this.gitHubOrganizationRole;
  }

  private String getKongPageUrl(final HttpServletRequest httpRequest, final String path) {
    final String limit = httpRequest.getParameter("limit");
    final StringBuilder url = new StringBuilder(this.kongAdminUrl);
    url.append(path);
    if (path.indexOf('?') == -1) {
      url.append('?');
    } else {
      url.append('&');
    }
    url.append("size=");
    url.append(limit);

    final String[] filterFieldNames = httpRequest.getParameterValues("filterFieldName");
    final String[] filterValues = httpRequest.getParameterValues("filterValue");
    if (filterFieldNames != null && filterValues != null) {
      for (int i = 0; i < filterFieldNames.length; i++) {
        final String filterFieldName = filterFieldNames[i];
        String filterValue = filterValues[i];
        if (filterValue != null) {
          filterValue = filterValue.trim();
          if (filterValue.length() > 0) {
            url.append('&');
            url.append(filterFieldName);
            url.append('=');
            url.append(filterValue);
          }
        }

      }
    }
    return url.toString();
  }

  @SuppressWarnings({
    "unchecked", "rawtypes"
  })
  private <V> List<V> getList(final Map<String, Object> map, final String key) {
    final Object value = map.get(key);
    if (value == null) {
      return Collections.emptyList();
    } else if (value instanceof List) {
      return (List<V>)value;
    } else if (value instanceof Map) {
      final Map mapValue = (Map)value;
      if (mapValue.isEmpty()) {
        return Collections.emptyList();
      }
    }
    throw new IllegalArgumentException("Expecting a list for " + key + " not " + value);
  }

  private Map<String, Object> getMap(final Map<String, Object> requestData,
    final List<String> fieldNames) {
    final Map<String, Object> data = new LinkedHashMap<>();
    addData(data, requestData, fieldNames);
    return data;
  }

  private synchronized Map<String, Map<String, Object>> getObjectById(final String type) {
    Map<String, Map<String, Object>> objectById = this.objectByTypeAndId.get(type);
    if (objectById == null) {
      objectById = new HashMap<>();
      this.objectByTypeAndId.put(type, objectById);
    }
    return objectById;
  }

  private int getPageOffset(final HttpServletRequest httpRequest) {
    final String offset = httpRequest.getParameter("offset");
    if (offset != null && offset.length() > 1) {
      try {
        return Integer.parseInt(offset);
      } catch (final Exception e) {
        throw new IllegalArgumentException("Offset must be an integer number:" + offset, e);
      }
    }
    return 0;
  }

  public String getVersion() {
    if (this.version == null) {
      try (
        JsonHttpClient httpClient = newKongClient()) {
        final Map<String, Object> kongResponse = httpClient.get("");
        this.version = (String)kongResponse.get("version");

      } catch (final Exception e) {
        throw new IllegalStateException("Unable to get kong version", e);
      }
    }
    return this.version;
  }

  public void getVersion(final HttpServletResponse httpResponse) {
    final String version = getVersion();
    final Map<String, Object> response = Collections.singletonMap("version", version);
    Json.writeJson(httpResponse, response);
  }

  public void gitHubAddOrganizationMember(final HttpServletRequest request) throws IOException {
    final Principal userPrincipal = request.getUserPrincipal();
    if (userPrincipal instanceof GitHubPrincipal) {
      final GitHubPrincipal gitHubPrincipal = (GitHubPrincipal)userPrincipal;
      try (
        JsonHttpClient client = new JsonHttpClient("https://api.github.com")) {
        client.put("/orgs/" + this.gitHubOrganizationName + "/memberships/"
          + gitHubPrincipal.getLogin() + "?access_token=" + this.gitHubAccessToken);
        gitHubPrincipal.addDeveloperRole();
      }
    }
  }

  public void groupUserAdd(final HttpServletResponse httpResponse, final String username,
    final String groupName) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> aclRequest = Collections.singletonMap(GROUP, groupName);

      final String aclPath = CONSUMERS_PATH2 + username + ACLS_PATH;
      Map<String, Object> apiResponse = Collections.emptyMap();
      try {
        apiResponse = httpClient.post(aclPath, aclRequest);
      } catch (final HttpStatusException e) {
        LOG.debug("Error adding group", e);
        if (e.getCode() == 404) {
          final Map<String, Object> consumer = Collections.singletonMap(USERNAME, username);
          httpClient.post(CONSUMERS_PATH, consumer);
          apiResponse = httpClient.post(aclPath, aclRequest);
        }
      }
      Json.writeJson(httpResponse, apiResponse);
    });
  }

  public void groupUserDelete(final HttpServletResponse httpResponse, final String username,
    final String groupName) {
    final String path = CONSUMERS_PATH2 + username + "/acls/" + groupName;
    handleDelete(httpResponse, path);
  }

  public void groupUserList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      final List<Map<String, Object>> data = getList(kongResponse, DATA);
      for (final Map<String, Object> acl : data) {
        final String consumerId = (String)acl.get(CONSUMER_ID);
        final String username = consumerGetUsername(httpClient, consumerId);
        acl.put(USERNAME, username);
      }
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public void handleAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
    } else {
      handleRequest(httpResponse, httpClient -> {
        final Map<String, Object> apiResponse = httpClient.post(path, requestData);
        Json.writeJson(httpResponse, apiResponse);
      });
    }
  }

  public void handleAdd(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path, final List<String> fieldNames) {
    final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
    if (requestData == null) {
      sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
    } else {
      handleRequest(httpResponse, httpClient -> {
        final Map<String, Object> insertData = getMap(requestData, fieldNames);
        final Map<String, Object> apiResponse = httpClient.post(path, insertData);
        Json.writeJson(httpResponse, apiResponse);
      });
    }
  }

  public void handleDelete(final HttpServletResponse httpResponse, final String path) {
    handleRequest(httpResponse, httpClient -> {
      httpClient.delete(path);
      writeJsonResponse(httpResponse, DELETED);
    });
  }

  public void handleGet(final HttpServletResponse httpResponse, final String path) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> kongResponse = httpClient.get(path);
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public void handleList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      Json.writeJson(httpResponse, kongResponse);
    });
  }

  public void handleListAll(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> response = kongPageAll(httpRequest, httpClient, path);
      Json.writeJson(httpResponse, response);
    });
  }

  public void handleRequest(final HttpServletResponse httpResponse, final JsonHttpConsumer action) {
    final JsonHttpFunction function = action;
    handleRequest(httpResponse, function);
  }

  public Map<String, Object> handleRequest(final HttpServletResponse httpResponse,
    final JsonHttpFunction action) {
    try (
      JsonHttpClient httpClient = newKongClient()) {
      return action.apply(httpClient);
    } catch (final HttpStatusException e) {
      if (e.getCode() == 503) {
        writeJsonError(httpResponse, KONG_SERVER_NOT_AVAILABLE, e);
      } else {
        LOG.error(e.toString() + "\n" + e.getBody(), e);
        writeJsonError(httpResponse, KONG_SERVER_RETURNED_AN_ERROR);
      }
    } catch (final HttpHostConnectException e) {
      LOG.debug("Kong not available", e);
      writeJsonError(httpResponse, KONG_SERVER_NOT_AVAILABLE);
    } catch (final Exception e) {
      LOG.debug("Unexpected kong error", e);
      writeJsonError(httpResponse, UNKNOWN_APPLICATION_ERROR, e);
    }
    return null;
  }

  public void handleUpdatePatch(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path, final List<String> fieldNames) {
    handleRequest(httpResponse, httpClient -> {

      final Map<String, Object> requestData = Json.readJsonMap(httpRequest);
      if (requestData == null) {
        sendError(httpResponse, HttpServletResponse.SC_BAD_REQUEST);
      } else {
        final Map<String, Object> updateData = getMap(requestData, fieldNames);
        httpClient.patch(path, updateData);
        writeJsonResponse(httpResponse, UPDATED);
      }
    });
  }

  protected Map<String, Object> kongPage(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient, final String path) throws IOException {
    int offsetPage = getPageOffset(httpRequest);
    String urlString = getKongPageUrl(httpRequest, path);
    Map<String, Object> kongResponse;
    do {
      kongResponse = httpClient.getByUrl(urlString);
      urlString = (String)kongResponse.remove(NEXT);
    } while (urlString != null && offsetPage-- > 0);
    return kongResponse;
  }

  private Map<String, Object> kongPageAll(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient, final String path) throws IOException {
    final List<Map<String, Object>> rows = new ArrayList<>();

    kongPageAll(httpRequest, httpClient, path, (Consumer<Map<String, Object>>)rows::add);

    return newResponseRows(rows);
  }

  protected void kongPageAll(final HttpServletRequest httpRequest, final JsonHttpClient httpClient,
    final String path, final Consumer<Map<String, Object>> action) throws IOException {
    String urlString = getKongPageUrl(httpRequest, path);
    do {
      final Map<String, Object> kongResponse = httpClient.getByUrl(urlString);
      final List<Map<String, Object>> rows = getList(kongResponse, DATA);
      for (final Map<String, Object> row : rows) {
        action.accept(row);
      }
      urlString = (String)kongResponse.get(NEXT);
    } while (urlString != null);
  }

  protected Map<String, Object> kongPageAll(final HttpServletRequest httpRequest,
    final JsonHttpClient httpClient, final String path, final Predicate<Map<String, Object>> filter)
    throws IOException {
    final List<Map<String, Object>> allRows = new ArrayList<>();
    kongPageAll(httpRequest, httpClient, path, row -> {
      if (filter == null || filter.test(row)) {
        allRows.add(row);
      }
    });
    final Map<String, Object> response = new LinkedHashMap<>();
    final int offsetPage = getPageOffset(httpRequest);
    if (offsetPage > 0) {
      final List<Map<String, Object>> rows = allRows.subList(offsetPage, allRows.size());
      response.put(DATA, rows);
    } else {
      response.put(DATA, allRows);
    }
    response.put(TOTAL, allRows.size());
    return response;
  }

  private void logError(final String message, final Throwable e) {
    if (e instanceof HttpStatusException) {
      final HttpStatusException statusE = (HttpStatusException)e;
      if (statusE.getCode() == 503) {
        LOG.error("{}\nKong not available", message);
      } else {
        final String logMessage = message + "\n" + e.toString() + "\n" + statusE.getBody();
        LOG.error(logMessage, statusE);
      }
    } else if (e instanceof HttpHostConnectException) {
      LOG.error("{}\nKong not available", message);
    } else {
      final String logMessage = message + "\n" + e.getMessage();
      LOG.error(logMessage, e);
    }
  }

  public JsonHttpClient newKongClient() {
    return new JsonHttpClient(this.kongAdminUrl, this.kongAdminUsername, this.kongAdminPassword);
  }

  private Map<String, Object> newResponseRows(final List<Map<String, Object>> rows) {
    final Map<String, Object> response = new LinkedHashMap<>();
    response.put(DATA, rows);
    response.put(TOTAL, rows.size());
    return response;
  }

  @SuppressWarnings("unchecked")
  private Map<String, Object> pluginGet(final Map<String, Object> api, final String pluginName) {
    final Map<String, Map<String, Object>> plugins = (Map<String, Map<String, Object>>)api
      .get(PLUGINS);
    if (plugins == null) {
      return null;
    } else {
      return plugins.get(pluginName);
    }
  }

  public void pluginList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final String path = PLUGINS_PATH;
      final Map<String, Object> kongResponse = kongPage(httpRequest, httpClient, path);
      pluginListAddData(httpResponse, httpClient, kongResponse);
    });
  }

  public void pluginList(final HttpServletRequest httpRequest,
    final HttpServletResponse httpResponse, final String path,
    final Predicate<Map<String, Object>> filter) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> kongResponse = kongPageAll(httpRequest, httpClient, path, filter);
      pluginListAddData(httpResponse, httpClient, kongResponse);
      final List<Map<String, Object>> rows = getList(kongResponse, DATA);
      rows.sort(PLUGIN_COMPARATOR);
    });
  }

  private void pluginListAddData(final HttpServletResponse httpResponse,
    final JsonHttpClient httpClient, final Map<String, Object> kongResponse) {
    final List<Map<String, Object>> data = getList(kongResponse, DATA);
    for (final Map<String, Object> acl : data) {
      final String apiId = (String)acl.get(API_ID);
      final String apiName = apiGetName(httpClient, apiId);
      acl.put("api_name", apiName);

      final String consumerId = (String)acl.get(CONSUMER_ID);
      final String username = consumerGetUsername(httpClient, consumerId);
      acl.put("consumer_username", username);
    }
    Json.writeJson(httpResponse, kongResponse);
  }

  public void pluginNameList(final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> enabledResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = getList(enabledResponse, "enabled_plugins");
      Collections.sort(pluginNames);
      final List<Map<String, Object>> rows = new ArrayList<>();
      for (final String pluginName : pluginNames) {
        final Map<String, Object> row = Collections.singletonMap(NAME, pluginName);
        rows.add(row);
      }
      final Map<String, Object> response = new LinkedHashMap<>();
      response.put(DATA, rows);
      response.put(TOTAL, rows.size());
      Json.writeJson(httpResponse, response);
    });
  }

  public void pluginNames(final HttpServletResponse httpResponse) {
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> enabledResponse = httpClient.get("/plugins/enabled");
      final List<String> pluginNames = getList(enabledResponse, "enabled_plugins");
      Collections.sort(pluginNames);
      Json.writeJson(httpResponse, enabledResponse);
    });
  }

  @SuppressWarnings("unchecked")
  private void pluginSchemaAddFields(final String prefix, final List<String> allFieldNames,
    final Map<String, Object> pluginSchema, final Map<String, Object> kongPluginSchema,
    final Map<String, Object> customSchema) {
    final Map<String, Map<String, Object>> pluginFieldMap = new TreeMap<>();
    pluginSchema.put(FIELDS, pluginFieldMap);
    final Map<String, Map<String, Object>> kongFieldMap = (Map<String, Map<String, Object>>)kongPluginSchema
      .getOrDefault(FIELDS, Collections.emptyMap());
    final Map<String, Map<String, Object>> customFieldMap = (Map<String, Map<String, Object>>)customSchema
      .getOrDefault(FIELDS, Collections.emptyMap());
    for (final Entry<String, Map<String, Object>> fieldEntry : kongFieldMap.entrySet()) {
      final String fieldName = fieldEntry.getKey();
      final Map<String, Object> kongField = fieldEntry.getValue();

      final Map<String, Object> pluginField = new LinkedHashMap<>();
      pluginFieldMap.put(fieldName, pluginField);
      final Map<String, Object> customField = customFieldMap.getOrDefault(fieldName,
        Collections.emptyMap());
      pluginField.put(NAME, fieldName);

      String fieldType = (String)kongField.get("type");
      if ("boolean".equals(fieldType)) {
        fieldType = "checkbox";
      } else if (kongField.containsKey("enum") || customField.containsKey(VALUES)) {
        fieldType = "select";
      }
      pluginField.put("fieldType", fieldType);

      String title = (String)customField.get("title");
      if (title == null) {
        title = CaseConverter.toCapitalizedWords(fieldName);
      }
      pluginField.put("title", title);
      setProperty(pluginField, "required", kongField, "required");
      setProperty(pluginField, "readOnly", kongField, "immutable");
      setProperty(pluginField, VALUES, kongField, "enum", customField.get(VALUES));
      Object defaultValue = kongField.get("default");
      if ("array".equals(fieldType)) {
        if (defaultValue == null || defaultValue instanceof Map) {
          defaultValue = Collections.emptyList();
        }
      } else if ("table".equals(fieldType)) {
        defaultValue = pluginSchemaAddFieldsTable(prefix, allFieldNames, fieldName, kongField,
          pluginField, customField, defaultValue);
      }
      pluginField.put("defaultValue", defaultValue);
    }
  }

  @SuppressWarnings("unchecked")
  private Object pluginSchemaAddFieldsTable(final String prefix, final List<String> allFieldNames,
    final String fieldName, final Map<String, Object> kongField,
    final Map<String, Object> pluginField, final Map<String, Object> customField,
    final Object defaultValue) {
    final Map<String, Object> kongPluginChildSchema = (Map<String, Object>)kongField
      .getOrDefault("schema", Collections.emptyMap());
    pluginSchemaAddFields(prefix + fieldName + ".", allFieldNames, pluginField,
      kongPluginChildSchema, customField);
    if (defaultValue == null) {
      return Collections.emptyMap();
    } else {
      return defaultValue;
    }
  }

  public void pluginSchemaGet(final HttpServletResponse httpResponse, final String pluginName) {
    final String schemaPath = "/plugins/schema/" + pluginName;
    final Map<String, Object> customSchema = getCustomSchema(pluginName);
    handleRequest(httpResponse, httpClient -> {
      final Map<String, Object> kongPluginSchema = httpClient.get(schemaPath);
      final Map<String, Object> pluginSchema = new LinkedHashMap<>();
      final List<String> allFieldNames = new ArrayList<>();

      pluginSchemaAddFields("", allFieldNames, pluginSchema, kongPluginSchema, customSchema);
      new PluginFieldLayout(pluginName, pluginSchema, getList(customSchema, "layout"));

      Json.writeJson(httpResponse, pluginSchema);
    });
  }

  private void readProperties() {
    final File propertiesFile = new File("config/gwa.properties");
    try {
      if (propertiesFile.exists()) {
        final Properties properties = new Properties();
        try (
          FileInputStream in = new FileInputStream(propertiesFile)) {
          properties.load(in);
          final Enumeration<?> propertyNames = properties.propertyNames();
          while (propertyNames.hasMoreElements()) {
            final String propertyName = (String)propertyNames.nextElement();
            final String value = properties.getProperty(propertyName);
            this.config.put(propertyName, value);
          }
        }
      }
    } catch (final Exception e) {
      LOG.error("Unable to read config from: " + propertiesFile, e);
    }
  }

  protected void sendError(final HttpServletResponse response, final int statusCode) {
    try {
      response.sendError(statusCode);
    } catch (final IOException e) {
      LOG.debug("Unable to send status:" + statusCode, e);
    }
  }

  public void setCaching(final boolean caching) {
    this.caching = caching;
  }

  @SuppressWarnings("unchecked")
  private <V> V setProperty(final Map<String, Object> target, final String targetName,
    final Map<String, Object> source, final String sourceName) {
    final Object value = source.get(sourceName);
    if (value != null) {
      target.put(targetName, value);
    }
    return (V)value;
  }

  @SuppressWarnings("unchecked")
  private <V> V setProperty(final Map<String, Object> target, final String targetName,
    final Map<String, Object> source, final String sourceName, final Object defaultValue) {
    Object value = source.get(sourceName);
    if (value == null) {
      value = defaultValue;
    }
    if (value != null) {
      target.put(targetName, value);
    }
    return (V)value;
  }

  public void writeInserted(final HttpServletResponse httpResponse, final String id)
    throws IOException {
    httpResponse.setContentType(APPLICATION_JSON);
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"data\":{\"inserted\": true,\"id\":\"");
      writer.print(id);
      writer.println("\"}}");
    }
  }

  public void writeJsonError(final HttpServletResponse httpResponse, final String message) {
    httpResponse.setContentType(APPLICATION_JSON);
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"error\":\"");
      writer.print(message);
      writer.println("\"}");
    } catch (final IOException ioe) {
      LOG.debug("Unable to write error: " + message, ioe);
    }
  }

  public void writeJsonError(final HttpServletResponse httpResponse, final String message,
    final Throwable e) {
    LOG.error(message, e);
    httpResponse.setContentType(APPLICATION_JSON);
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"error\":\"");
      writer.print(message);
      writer.println("\"}");
    } catch (final IOException ioe) {
      LOG.debug("Unable to write error: " + message, ioe);
    }
  }

  public void writeJsonResponse(final HttpServletResponse httpResponse, final String field) {
    httpResponse.setContentType(APPLICATION_JSON);
    try (
      PrintWriter writer = httpResponse.getWriter()) {
      writer.print("{\"");
      writer.print(field);
      writer.println("\": true}");
    } catch (final IOException ioe) {
      LOG.debug("Unable to write status: " + field, ioe);
    }
  }
}
