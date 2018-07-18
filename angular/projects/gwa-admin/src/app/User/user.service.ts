import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from 'revolsys-angular-framework';
import {User} from './User';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(injector: Injector) {
    super(injector);
    this.path = `/users`;
    this.typeTitle = 'User';
    this.labelFieldName = 'username';
    this.pathParamName = 'username';
  }

  deleteObject(user: User, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `/users/${user.id}`
    );
  }

  updateObject(user: User): Observable<User> {
    return this.updateObjectDo(
      `/users/${user.id}`,
      user
    );
  }

  newObject(): User {
    return new User();
  }

}
