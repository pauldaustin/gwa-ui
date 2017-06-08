import { Plugin } from '../Plugin/Plugin';

export interface HttpMethodState {
  name: string;
  enabled: boolean;
}

export class Api {
  private static ALL_METHODS: Array<string> = [
    'GET',
    'HEAD',
    'OPTIONS',
    'POST',
    'PUT',
    'DELETE'
  ];


  id: string;
  created_at: string;
  upstream_url: string;
  preserve_host: string;
  name: string;
  _hosts: string[] = [];
  _uris: string[] = [];
  //  methods : string; getter function
  strip_uri = true;
  retries = 5;
  upstream_connect_timeout = 60000;
  upstream_send_timeout = 60000;
  upstream_read_timeout = 60000;
  https_only = false;
  http_if_terminated = true;


  method_flags: Array<HttpMethodState> = [];
  _pluginByName: { [name: string]: Plugin } = {};

  static uri(uriTemplate: string, name: string): string {
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

  get methods(): Array<string> {
    const methods: Array<string> = [];
    if (this.method_flags) {
      for (const methodFlag of this.method_flags) {
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
    for (const method of Api.ALL_METHODS) {
      let enabled: boolean;
      if (hasValue) {
        enabled = allowedHttpMethods.indexOf(method) !== -1;
      } else {
        enabled = method === 'GET';
      }
      this.method_flags.push({ name: method, enabled: enabled });
    }
  }

  get uris(): string[] {
    return this._uris;
  }

  set uris(uris) {
    this._uris.length = 0;
    if (typeof uris === 'string') {
      this._uris.push(uris);
    } else if (Array.isArray(uris)) {
      for (const uri of uris) {
        if (uri && uri.trim().length > 0) {
          this._uris.push(uri);
        }
      }
    }
  }

  get hosts(): string[] {
    return this._hosts;
  }

  set hosts(hosts) {
    this._hosts.length = 0;
    if (typeof hosts === 'string') {
      this._hosts.push(hosts);
    } else if (Array.isArray(hosts)) {
      for (const host of hosts) {
        if (host && host.trim().length > 0) {
          this._hosts.push(host);
        }
      }
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
    for (const name of Object.keys(pluginsByName)) {
      delete pluginsByName[name];
    }
    if (pluginsJson) {
      const api = this;
      for (const pluginName of Object.keys(pluginsJson)) {
        const pluginJson = pluginsJson[pluginName];
        const plugin = new Plugin();
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

  private cleanArray(values: string[]): string[] {
    const newValues: string[] = [];
    for (let value of values) {
      if (value) {
        value = value.trim();
        if (value.length > 0) {
          newValues.push(value);
        }
      }
    }
    return newValues;
  }

  toJSON(): any {
    return {
      id: this.id,
      created_at: this.created_at,
      upstream_url: this.upstream_url,
      preserve_host: this.preserve_host,
      name: this.name,
      hosts: this.cleanArray(this._hosts),
      uris: this.cleanArray(this._uris),
      methods: this.methods,
      strip_uri: this.strip_uri,
      retries: this.retries,
      upstream_connect_timeout: this.upstream_connect_timeout,
      upstream_send_timeout: this.upstream_send_timeout,
      upstream_read_timeout: this.upstream_read_timeout,
      https_only: this.https_only,
      http_if_terminated: this.http_if_terminated,

      plugins: this._pluginByName,
    };
  }
}
