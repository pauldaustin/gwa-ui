import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {
 
  constructor(injector:Injector) {
    super(injector);
    this.path = `/apis`;
    this.typeTitle = 'API';
    this.labelFieldName = 'group';
  }

  addObject(application: Api): Promise<Api> {
    return this.addObjectDo(
      '/apis',
      application
    );
  }
 
  deleteObject(application: Api, path?: string): Promise<boolean> {
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
