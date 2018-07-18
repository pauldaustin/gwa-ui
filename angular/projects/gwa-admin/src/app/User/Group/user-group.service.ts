import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from 'revolsys-angular-framework';
import {User} from '../User';
import {Group} from '../../Group/Group';

@Injectable()
export class UserGroupService extends BaseService<Group> {
  constructor(injector: Injector) {
    super(injector);
    this.typeTitle = 'Group';
    this.labelFieldName = 'group';
  }

  deleteObject(group: Group, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `${path}/${group.id}`
    );
  }

  newObject(): Group {
    return new Group();
  }
}
