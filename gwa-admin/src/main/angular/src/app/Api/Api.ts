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


  static uri(uriTemplate : string, name : string) : string {
    if (uriTemplate) {
      if (name) {
        return uriTemplate.replace('{name}', name);
      } else {
        return uriTemplate;
      }
    }
  }

  constructor() {
    this.methods = null;
  }

  id : string;
  created_at : string;
  upstream_url : string;
  preserve_host : string;
  name : string;
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
  

  method_flags: Array<HttpMethodState> = [];
  _pluginByName : { [name: string] : Plugin } = {};

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

/* Plugin Methods */

  get plugins(): Array<Plugin> {
    const names: string[] = Object.keys(this._pluginByName);
    names.sort();
    const plugins: Array<Plugin> = [];
    for (const name of names) {
      const plugin = this._pluginByName[name];
      plugins.push(plugin);
    }
    return plugins;
  }
  
  set plugins(pluginsJson) {
    const pluginsByName = this._pluginByName;
    for (const name in pluginsByName) {
      delete pluginsByName[name]
    }
    if (pluginsJson) {
      let api = this;
      for (const pluginJson of pluginsJson) {
        let plugin = new Plugin();
        Object.assign(plugin, pluginJson);
        plugin.api = api;
        pluginsByName[plugin.name] = plugin;
      }
    }
  }

  pluginAdd(plugin: Plugin) {
    plugin.api = this;
    this._pluginByName[plugin.name] = plugin;
  }

  pluginRemove(plugin: Plugin) {
    const name = plugin.name;
    delete this._pluginByName[name];
  }

  plugin(name: string) {
    return this._pluginByName[name];
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
