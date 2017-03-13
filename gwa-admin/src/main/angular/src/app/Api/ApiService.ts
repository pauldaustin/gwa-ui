import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {
  oldVersion : boolean = true;

  constructor(injector:Injector) {
    super(
      injector,
      '/apis',
      'API',
      'name'
    );
    const url = this.getUrl('/version');
    this.http.get(url)
      .toPromise()
      .then(response => {
        const json = response.json();
        if (!json.error) {
          if (json.version) {
            this.oldVersion = json.version.indexOf('0.9') == 0;
          }
        }
      });
  }

  deleteObject(api: Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${api.id}`
    );
  }

  getMyApis(): Promise<Api[]> {
    return this.getObjectsDo('/apis/my');
  }

  updateObject(api: Api): Promise<Api> {
    return this.updateObjectDo(
      `/apis/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return new Api();
  }
}
