import {
  Component,
  Injector
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {User} from './User';
import {UserService} from './user.service';

@Component({
  selector: 'admin-user-list',
  templateUrl: 'user-list.component.html'
})
export class UserListComponent extends BaseListComponent<User> {

  constructor(
    injector: Injector,
    service: UserService
  ) {
    super(injector, service, 'Users - Gateway Admin');
    this.paging = true;
    this.columnNames = ['id', 'username', 'custom_id', 'created_at', 'actions'];
    this.filterFields = [
      {prop: 'username', name: 'Username'},
      {prop: 'custom_id', name: 'Custom ID'},
    ];
    this.filterFieldName = 'username';
  }
}
