import {
  Injectable,
  Injector
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { BaseService } from '../Service/BaseService';

import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {
  constructor(injector:Injector) {
    super(injector);
  }

  addObject(api: Api): Promise<Api> {
    return this.addObjectDo(
      '/apis',
      api
    );
  }

  deleteObject(api: Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${api.id}`
    );
  }

  getApi(id: string): Promise<Api> {
    const url = this.getUrl(`/apis/${id}`);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toObject(data);
      })
      .catch(this.handleError);
  }

  getMyApis(): Promise<Api[]> {
    return this.getObjectsDo('/apis/my');
  }

  getObjects(): Promise<Api[]> {
    return this.getObjectsDo('/apis');
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
