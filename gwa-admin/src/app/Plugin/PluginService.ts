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
    this.path = '/plugins';
    this.typeTitle = 'Plugins';
    this.labelFieldName = 'name';
  }

  getPluginNames(): Promise<string[]> {
    const url = this.getUrl('/plugins/_names');
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json().enabled_plugins;
      })
      .catch(this.handleError);
  }

  getPluginSchema(pluginName: String): Promise<any> {
    const url = this.getUrl(`/plugins/${pluginName}/schema`);
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
