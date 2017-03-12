import {
  Injectable,
  Injector
} from '@angular/core';

import { BaseService } from '../Service/BaseService';

@Injectable()
export class StatusService extends BaseService<any> {
  constructor(injector:Injector) {
    super(injector);
  }

  getStatus(): Promise<any> {
    return this.getObjectDo('/status');
  }

  newObject(): any {
    return {};
  }
}
