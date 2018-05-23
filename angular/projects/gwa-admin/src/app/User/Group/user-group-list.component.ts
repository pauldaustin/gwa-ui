import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {User} from '../User';
import {Group} from '../../Group/Group';
import {UserGroupService} from './user-group.service';

@Component({
  selector: 'admin-user-group-list',
  templateUrl: 'user-group-list.component.html'
})
export class UserGroupListComponent extends BaseListComponent<Group> implements OnInit {

  user: User;

  addGroupName: string;

  constructor(
    injector: Injector,
    service: UserGroupService
  ) {
    super(injector, service, 'Users - Gateway Admin');
    this.paging = true;
    this.filterFields = [
      {prop: 'group', name: 'Group'},
    ];
    this.filterFieldName = 'group';
    this.columnNames = ['group', 'created_at', 'actions'];
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: {user: User}) => {
        this.user = data.user;
        this.path = '/users/' + data.user.username + '/groups';
      });
    super.ngOnInit();
  }

  addGroup() {
    if (this.addGroupName) {
      const group = this.service.newObject();
      group.user_id = this.user.id;
      group.group = this.addGroupName.toLowerCase();
      this.service.addObject(group, this.path)
        .subscribe(savedGroup => {
          this.refresh();
        });
    }
  }
}
