import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

import { ApiKey } from './ApiKey';

@Injectable()
export class ApiKeyService extends BaseService<ApiKey> {
 
  constructor(injector:Injector) {
    super(injector);
  }

  addObject(apiKey: ApiKey): Promise<ApiKey> {
//    const api = apiKey.api;
//    return this.addObjectDo(
//      `/apis/${api.id}`,
//      apiKey,
//      () => api.apiKeyAdd(apiKey)
//    );
    return null;
  }


  deleteObject(apiKey: ApiKey): Promise<boolean> {
//    const api = apiKey.api;
//    return this.deleteObjectDo(
//      `/apis/${api.id}/apiKeys/${apiKey.id}`,
//      deleted => {
//        api.apiKeyRemove(apiKey);
//      }
//    );
    return null;
  }

  newObject(): ApiKey {
    return new ApiKey();
  }

  updateObject(apiKey: ApiKey): Promise<ApiKey> {
    return null;
  }
}
