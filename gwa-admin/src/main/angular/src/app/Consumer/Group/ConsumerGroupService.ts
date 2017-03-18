import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../../Service/BaseService';
import { Consumer } from '../Consumer';
import { ConsumerGroup } from './ConsumerGroup';

@Injectable()
export class ConsumerGroupService extends BaseService<ConsumerGroup> {
  constructor(injector:Injector) {
    super(injector);
    this.typeTitle = 'Group';
    this.labelFieldName = 'group';
  }

  deleteObject(group: ConsumerGroup, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `${path}/${group.id}`
    );
  }
  
  newObject() : ConsumerGroup {
    return new ConsumerGroup();
  }
}
