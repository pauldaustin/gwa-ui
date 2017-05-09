import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Group } from './Group';

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(injector:Injector) {
    super(injector);
    this.path = '/groups';
    this.typeTitle = 'Group';
    this.labelFieldName = 'config.name';
  }

  newObject(): Group {
    return new Group();
  }
}
