import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../../Service/BaseService';
import { Consumer } from '../Consumer';
import { Group } from '../../Group/Group';

@Injectable()
export class ConsumerGroupService extends BaseService<Group> {
  constructor(injector:Injector) {
    super(injector);
    this.typeTitle = 'Group';
    this.labelFieldName = 'group';
  }

  deleteObject(group: Group, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `${path}/${group.id}`
    );
  }
  
  newObject() : Group {
    return new Group();
  }
}
