import {
  Injectable,
  Injector
} from '@angular/core';

import {BaseService} from 'revolsys-angular-framework';

@Injectable()
export class RateLimitService extends BaseService<any> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/rateLimit';
    this.typeTitle = 'Rate Limit';
    this.labelFieldName = 'name';
  }
  newObject(): any {
    return {};
  }
}
