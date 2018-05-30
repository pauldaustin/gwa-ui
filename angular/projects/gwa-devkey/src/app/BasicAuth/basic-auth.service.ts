import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

import {BasicAuth} from './BasicAuth';

@Injectable()
export class BasicAuthService extends BaseService<BasicAuth> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/basicAuth';
    this.typeTitle = 'Basic Auth';
  }

  getObject(id: string, values?: any): Observable<BasicAuth> {
    return this.getObjectDo(this.path, values);
  }

  newObject(): BasicAuth {
    return new BasicAuth();
  }
}
