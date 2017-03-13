import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {
 
  constructor(injector:Injector) {
    super(
      injector,
      '/apis',
      'Consumer',
      'username'
    );
  }

  addObject(application: Api): Promise<Api> {
    return this.addObjectDo(
      '/apis',
      application
    );
  }
 
  deleteObject(application: Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${application.id}`
    );
  }

  newObject(): Api {
    return new Api();
  }

  updateObject(application: Api): Promise<Api> {
    return null;
  }
}
