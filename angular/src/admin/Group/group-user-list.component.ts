import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {Params} from '@angular/router';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';

import {Group} from './Group';
import {GroupUserService} from './group-user.service';

@Component({
  selector: 'app-user-group-list',
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
  }

  ngOnInit() {
    this.columns = [
      {prop: 'username', name: 'User', cellTemplate: this.idTemplate, sortable: false},
      {prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false},
      {prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false}
    ];
    this.route.params
      .map(params => params['groupName'])
      .subscribe(groupName => {
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
      .then((savedGroup) => {
        this.refresh();
      });
  }
}
