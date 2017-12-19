import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from '../../../shared/Service/BaseService';

import {Plugin} from '../../Plugin/Plugin';

@Injectable()
export class UserDataService extends BaseService<Plugin> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/users/_data';
    this.typeTitle = 'User Data';
    this.labelFieldName = 'name';
  }

  getDataNames(): Promise<string[]> {
    const url = this.getUrl('/users/_data');
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        return response.json().names;
      }
    );
  }

  getSchema(username: string, dataName: string): Promise<any> {
    const url = this.getUrl(`/users/${username}/data/${dataName}/_schema`);
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
      `/users/${plugin.user_username}/data/${plugin.name}`,
      plugin
    );
  }


  deleteObject(plugin: Plugin, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `${path}/${plugin.id}`
    );
  }

  newObject(): Plugin {
    return new Plugin();
  }

  updateObject(plugin: Plugin): Promise<Plugin> {
    return this.updateObjectDo(
      `/users/${plugin.user_username}/data/${plugin.name}/${plugin.id}`,
      plugin
    );
  }
}
