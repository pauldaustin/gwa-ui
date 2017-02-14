import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { Plugin } from '../Plugin/Plugin';

@Injectable()
export class PluginService extends BaseService<Plugin> {

  constructor(injector:Injector) {
    super(injector);
  }

  getPluginNames(): Promise<string[]> {
    return this.http.get(this.serviceUrl + "/plugins")
      .toPromise()
      .then(response => {
        return response.json().enabled_plugins;
      })
      .catch(this.handleError);
  }

  getPluginSchema(pluginName: String): Promise<any> {
    return this.http.get(this.serviceUrl + "/plugins/" + pluginName)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  addObject(plugin: Plugin): Promise<Plugin> {
    const api = plugin.api;
    return super.addObjectDo(
      `/apis/${api.id}/plugins`,
      plugin,
      () => api.pluginAdd(plugin)
    );
  }


  deleteObject(plugin: Plugin): Promise<boolean> {
    const api = plugin.api;
    return this.deleteObjectDo(
      `/apis/${api.id}/plugins/${plugin.id}`,
      deleted => {
        if (deleted) {
          api.pluginRemove(plugin);
        }
      }
    );
  }

  toObject(json: any): Plugin {
    let plugin = new Plugin();
    Object.assign(plugin, json);
    return plugin;
  }

  updateObject(plugin: Plugin): Promise<Plugin> {
    return this.updateObjectDo(
      `apis/${plugin.api.id}/plugins/${plugin.id}`,
      plugin
    );
  }
}
