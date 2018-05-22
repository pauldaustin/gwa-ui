import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from '../../../../../src/shared/Service/BaseService';

import {Api} from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/apis';
    this.typeTitle = 'API';
    this.labelFieldName = 'name';
  }
  newObject(): Api {
    return new Api();
  }
}
