import { ApiKey } from '../ApiKey/ApiKey';
import { Plugin } from '../Plugin/Plugin';

interface HttpMethodState {
  name: string;
  enabled: boolean;
}

export class Api {
  private static ALL_METHODS: Array<string> = [
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "DELETE"
  ];

  id : string;
  name : string;
  upstream_url : string;
  preserve_host : boolean;
  created_at : string;
  retries : number;
  https_only : boolean;
  http_if_terminated : boolean;
  hosts : Array<String>;
  uris : Array<String>;
  strip_uri : boolean;

  title : string;
  created_by: string = "Unknown";
  upstream_username: string;
  upstream_password: string;
  enabled: boolean = true;
  method_flags: Array<HttpMethodState> = [];
  _apiKeys: Array<ApiKey> = [];
  _plugins: Array<Plugin> = [];

  constructor() {
    this.methods = null;
  }

  get methods(): Array<string> {
    let methods: Array<string> = [];
    if (this.method_flags) {
      for (let methodFlag of this.method_flags) {
        if (methodFlag.enabled) {
          methods.push(methodFlag.name);
        }
      }
    }
    return methods;
  }
  
  set methods(allowedHttpMethods: Array<string>) {
    this.method_flags.length = 0;
    for (let method of Api.ALL_METHODS) {
      var enabled : boolean;
      if (allowedHttpMethods) {
        enabled = allowedHttpMethods.indexOf(method) != -1;
      } else {
        enabled = method == "GET";
      }
      this.method_flags.push({name: method, enabled: enabled});
    }
  }

/* API Key Methods */

  apiKeyAdd(apiKey: ApiKey) {
    this._apiKeys.push(apiKey);
  }

  apiKeyRemove(apiKey: ApiKey) {
    this._apiKeys = this._apiKeys.filter(key => key != apiKey);
  }

  get api_keys(): Array<ApiKey> {
    return this._apiKeys;
  }
   
  get apiKeys(): Array<ApiKey> {
    return this._apiKeys;
  }
  
  set api_keys(apiKeysJson) {
    if (apiKeysJson) {
      let apiKeys = this._apiKeys;
      apiKeysJson.forEach((apiKeyJson: any) => {
        let apiKey = new ApiKey();
        Object.assign(apiKey, apiKeyJson);
        apiKeys.push(apiKey);
      });
    } else {
      this._apiKeys.length = 0;
    }
  }

/* Plugin Key Methods */

  get plugins(): Array<Plugin> {
    return this._plugins;
  }
  
  set plugins(pluginsJson) {
    if (pluginsJson) {
      let api = this;
      let plugins = this._plugins;
      pluginsJson.forEach((pluginJson: any) => {
        let plugin = new Plugin();
        Object.assign(plugin, pluginJson);
        plugin.api = api;
        plugins.push(plugin);
      });
    } else {
      this._plugins.length = 0;
    }
  }

  pluginAdd(plugin: Plugin) {
    plugin.api = this;
    for (let i = 0; i < this._plugins.length; i++) {
      let currentPlugin = this._plugins[i];
      if (plugin.name < currentPlugin.name) {
        this._plugins.splice(i, 0, plugin);
        return;
      }
    }
    this._plugins.push(plugin);
  }

  pluginRemove(plugin: Plugin) {
    this._plugins = this._plugins.filter(currentPlugin => currentPlugin.name != plugin.name);
  }
  
  getAllMethods(): Array<string> {
    return Api.ALL_METHODS;
  }

  toJSON(): any {
    return {
      id : this.id,
      name : this.name,
      upstream_url: this.upstream_url,
      methods: this.methods,
      preserve_host : this.preserve_host,
      created_at : this.created_at,
      retries : this.retries,
      https_only : this.https_only,
      http_if_terminated : this.http_if_terminated,
      hosts : this.hosts,
      uris : this.uris,
      strip_uri : this.strip_uri,
      
      plugins : this.plugins,
      
      title : this.title,
      created_by: this.created_by,
      upstream_username: this.upstream_username,
      upstream_password: this.upstream_password,
      enabled: this.enabled,
    };
  }
}
