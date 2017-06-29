import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../../Service/BaseService';
import { User } from './User';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(injector: Injector) {
    super(injector);
    this.path = `/users`;
    this.typeTitle = 'User';
    this.labelFieldName = 'username';
    this.pathParamName = 'username';
  }

  deleteObject(user: User, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `/users/${user.id}`
    );
  }

  updateObject(user: User): Promise<User> {
    return this.updateObjectDo(
      `/users/${user.id}`,
      user
    );
  }

  newObject(): User {
    return new User();
  }
}
