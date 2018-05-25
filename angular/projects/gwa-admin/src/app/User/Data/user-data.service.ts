import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

import {Plugin} from '../../Plugin/Plugin';

@Injectable()
export class UserDataService extends BaseService<Plugin> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/users/_data';
    this.typeTitle = 'User Data';
    this.labelFieldName = 'name';
  }

  getDataNames(): Observable<string[]> {
    const url = this.getUrl('/users/_data');
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        return response.names;
      }
    );
  }

  getSchema(username: string, dataName: string): Observable<any> {
    const url = this.getUrl(`/users/${username}/data/${dataName}/_schema`);
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        return response;
      }
    );
  }

  addObject(plugin: Plugin): Observable<Plugin> {
    const api = plugin.api;
    return super.addObjectDo(
      `/users/${plugin.user_username}/data/${plugin.name}`,
      plugin
    );
  }


  deleteObject(plugin: Plugin, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `${path}/${plugin.id}`
    );
  }

  newObject(): Plugin {
    return new Plugin();
  }

  updateObject(plugin: Plugin): Observable<Plugin> {
    return this.updateObjectDo(
      `/users/${plugin.user_username}/data/${plugin.name}/${plugin.id}`,
      plugin
    );
  }
}
