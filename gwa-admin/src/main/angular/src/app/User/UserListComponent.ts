import { 
  Component, 
  Injector
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { User } from './User';
import { UserService } from './UserService';

@Component({
  selector: 'user-list',
  templateUrl: 'UserList.html'
})
export class UserListComponent extends BaseListComponent<User> {

  constructor(
    injector: Injector,
    service: UserService
  ) {
    super(injector, service);
    this.paging = true;
    this.filterFields = [
      { prop: "username", name: "Username"},
      { prop: "custom_id", name: "Custom ID"},
    ];
    this.filterFieldName = "username";
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'username', name: 'Username', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'custom_id', name: 'Custom Id', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  } 
}