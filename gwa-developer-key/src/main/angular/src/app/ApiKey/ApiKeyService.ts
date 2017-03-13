import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { ApiKey } from './ApiKey';

@Injectable()
export class ApiKeyService extends BaseService<ApiKey> {
 
  constructor(injector:Injector) {
    super(
      injector,
      '/apiKeys',
      'Api Key',
      'name'
    );
  }

  
  addObject(apiKey: ApiKey): Promise<ApiKey> {
    return this.addObjectDo(
      '/apiKeys',
      apiKey
    );
  }
 
  deleteObject(apiKey: ApiKey): Promise<boolean> {
    return this.deleteObjectDo(
      `/apiKeys/${apiKey.id}`
    );
  }

  newObject(): ApiKey {
    return new ApiKey();
  }

  updateObject(apiKey: ApiKey): Promise<ApiKey> {
    return null;
  }
}
