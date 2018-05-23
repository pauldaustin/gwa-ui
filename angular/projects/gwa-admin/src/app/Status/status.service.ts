import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

@Injectable()
export class StatusService extends BaseService<any> {
  constructor(injector: Injector) {
    super(injector);
  }

  getStatus(): Observable<any> {
    return this.getObjectDo('/status');
  }

  newObject(): any {
    return {};
  }
}
