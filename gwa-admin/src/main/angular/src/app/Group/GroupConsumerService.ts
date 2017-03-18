import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Group } from './Group';

@Injectable()
export class GroupConsumerService extends BaseService<Group> {
  constructor(injector:Injector) {
    super(injector);
    this.typeTitle = 'Group';
    this.labelFieldName = 'group';
  }

  deleteObject(group: Group, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `/consumers/${group.username}/groups/${group.group}`
    );
  }
  
  newObject() : Group {
    return new Group();
  }
}
