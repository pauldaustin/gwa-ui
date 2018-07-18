import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from 'revolsys-angular-framework';
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

  deleteObject(group: Group, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `/groups/${group.group}`
    );
  }
}
