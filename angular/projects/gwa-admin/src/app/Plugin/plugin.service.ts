import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

import {Plugin} from '../Plugin/Plugin';

@Injectable()
export class PluginService extends BaseService<Plugin> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/plugins';
    this.typeTitle = 'Plugins';
    this.labelFieldName = 'name';
  }

  getPluginNames(): Observable<string[]> {
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

  getPluginSchema(pluginName: String): Observable<any> {
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

  addObject(plugin: Plugin): Observable<Plugin> {
    const api = plugin.api;
    return super.addObjectDo(
      `/apis/${api.id}/plugins`,
      plugin,
      () => api.pluginAdd(plugin)
    );
  }


  deleteObject(plugin: Plugin, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `/apis/${plugin.api_id}/plugins/${plugin.id}`
    );
  }

  newObject(): Plugin {
    return new Plugin();
  }

  updateObject(plugin: Plugin): Observable<Plugin> {
    return this.updateObjectDo(
      `/apis/${plugin.api.name}/plugins/${plugin.id}`,
      plugin
    );
  }
}
