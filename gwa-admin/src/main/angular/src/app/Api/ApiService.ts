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

  getObject(name: string): Promise<Api> {
     return this.getObjectDo(`/apis/${name}`);
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
