import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from '../../shared/Service/BaseService';
import {Group} from './Group';

@Injectable()
export class GroupService extends BaseService<Group> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/groups';
    this.typeTitle = 'Group';
    this.labelFieldName = 'group';
  }

  newObject(): Group {
    return new Group();
  }

  deleteObject(group: Group, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `/groups/${group.group}`
    );
  }
}
