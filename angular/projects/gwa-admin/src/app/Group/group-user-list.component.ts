import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {Params} from '@angular/router';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Group} from './Group';
import {GroupUserService} from './group-user.service';

@Component({
  selector: 'admin-user-group-list',
  templateUrl: 'group-user-list.component.html'
})
export class GroupUserListComponent extends BaseListComponent<Group> implements OnInit {

  groupName: string;

  addUsername: string;

  constructor(
    injector: Injector,
    service: GroupUserService
  ) {
    super(injector, service, 'Group Users - Gateway Admin');
    this.paging = true;
    this.deleteRecordTitle = 'User from Group';
    this.columnNames = ['username', 'created_at', 'actions'];
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const groupName = params['groupName'];
        this.setTitle(`Group: ${groupName} - Gateway Admin`);
        this.groupName = groupName;
        this.path = `/groups/${groupName}`;
        this.refresh();
      });
  }

  addUser() {
    const group = this.service.newObject();
    group.group = this.groupName;
    this.service.addObject(group, `/users/${this.addUsername}/groups`)
      .subscribe(savedGroup => {
        this.refresh();
      });
  }
}
