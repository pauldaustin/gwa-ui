import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

import {ApiKey} from './ApiKey';

@Injectable()
export class ApiKeyService extends BaseService<ApiKey> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/apiKeys';
    this.typeTitle = 'API Key';
    this.labelFieldName = 'key';
  }


  addObject(apiKey: ApiKey, path?: string): Observable<ApiKey> {
    return this.addObjectDo(
      '/apiKeys',
      apiKey
    );
  }


  deleteObject(apiKey: ApiKey, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `/apiKeys/${apiKey.key}`
    );
  }

  public getUrl(path: string): string {
    return window.location.protocol + '//' + window.location.host + this.config.basePath + '/rest' + path;
  }

  newObject(): ApiKey {
    return new ApiKey();
  }
}
