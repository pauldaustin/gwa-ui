import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from '../../shared/Service/BaseService';

import {Plugin} from '../Plugin/Plugin';

@Injectable()
export class PluginService extends BaseService<Plugin> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/plugins';
    this.typeTitle = 'Plugins';
    this.labelFieldName = 'name';
  }

  getPluginNames(): Promise<string[]> {
    const url = this.getUrl('/plugins/_names');
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        return response.json().enabled_plugins;
      }
    );
  }

  getPluginSchema(pluginName: String): Promise<any> {
    const url = this.getUrl(`/plugins/${pluginName}/_schema`);
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        return response.json();
      }
    );
  }

  addObject(plugin: Plugin): Promise<Plugin> {
    const api = plugin.api;
    return super.addObjectDo(
      `/apis/${api.id}/plugins`,
      plugin,
      () => api.pluginAdd(plugin)
    );
  }


  deleteObject(plugin: Plugin, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${plugin.api_id}/plugins/${plugin.id}`
    );
  }

  newObject(): Plugin {
    return new Plugin();
  }

  updateObject(plugin: Plugin): Promise<Plugin> {
    return this.updateObjectDo(
      `/apis/${plugin.api.name}/plugins/${plugin.id}`,
      plugin
    );
  }
}
