import { Plugin } from '../Plugin/Plugin';

export interface HttpMethodState {
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


  static uri(object : any): string {
    if (object.uri_template) {
      if (object.name) {
        object.uri_template.replace('{name}', object.name);
      } else {
        return object.uri_template;
      }
    }
  }

  constructor() {
    this.methods = null;
  }

  // All versions
  id : string;
  created_at : string;
  upstream_url : string;
  preserve_host : string;
  name : string;
  
  // 0.9.x
  strip_request_path : boolean = true;
  request_host : string;
  request_path : string;
  
  // 0.10.x
  hosts : string[];
  uris : string[];
//  methods : string; getter function
  strip_uri : boolean = true;
  retries : number = 5;
  upstream_connect_timeout : number = 60000;
  upstream_send_timeout : number = 60000;
  upstream_read_timeout : number = 60000;
  https_only : boolean = false;
  http_if_terminated : boolean = true;
  

  // Custom but this needs to be moved
  method_flags: Array<HttpMethodState> = [];
  _plugins: Array<Plugin> = [];
  _pluginsByName : { [name: string] : Plugin };

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
    const hasValue = Array.isArray(allowedHttpMethods);
    this.method_flags.length = 0;
    for (let method of Api.ALL_METHODS) {
      var enabled : boolean;
      if (hasValue) {
        enabled = allowedHttpMethods.indexOf(method) != -1;
      } else {
        enabled = method == "GET";
      }
      this.method_flags.push({name: method, enabled: enabled});
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
        this._pluginsByName.set(plugin.name, plugin);
      });
    } else {
      this._plugins.length = 0;
    }
  }

  pluginAdd(plugin: Plugin) {
    const name = plugin.name;
    plugin.api = this;
    this._pluginsByName.set(name, plugin);
    for (let i = 0; i < this._plugins.length; i++) {
      let currentPlugin = this._plugins[i];
      if (name < currentPlugin.name) {
        this._plugins.splice(i, 0, plugin);
        return;
      }
    }
    this._plugins.push(plugin);
  }

  pluginRemove(plugin: Plugin) {
    const name = plugin.name;
    this._plugins = this._plugins.filter(currentPlugin => currentPlugin.name != name);
    this._pluginsByName.delete(name);
  }

  plugin(name: string) {
    return this._pluginsByName.get(name);
  }

  getAllMethods(): Array<string> {
    return Api.ALL_METHODS;
  }

  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      upstream_url: this.upstream_url,
      preserve_host: this.preserve_host,
      name: this.name,
      
      strip_request_path: this.strip_request_path,
      request_host: this.request_host,
      request_path: this.request_path,
      
      hosts: this.hosts,
      uris: this.uris,
      methods: this.methods,
      strip_uri: this.strip_uri,
      retries: this.retries,
      upstream_connect_timeout: this.upstream_connect_timeout,
      upstream_send_timeout: this.upstream_send_timeout,
      upstream_read_timeout: this.upstream_read_timeout,
      https_only: this.https_only,
      http_if_terminated: this.http_if_terminated,
      
      plugins : this.plugins,
    };
  }
}
