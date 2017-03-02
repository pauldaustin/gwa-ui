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
    const url = this.getUrl('/plugins');
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json().enabled_plugins;
      })
      .catch(this.handleError);
  }

  getPluginSchema(pluginName: String): Promise<any> {
    const url = this.getUrl('/plugins/'+ pluginName);
    return this.http.get(url)
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

  newObject(): Plugin {
    return new Plugin();
  }

  updateObject(plugin: Plugin): Promise<Plugin> {
    return this.updateObjectDo(
      `apis/${plugin.api.id}/plugins/${plugin.id}`,
      plugin
    );
  }
}
