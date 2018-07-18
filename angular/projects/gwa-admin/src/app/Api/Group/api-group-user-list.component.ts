import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {Params} from '@angular/router';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Group} from '../../Group/Group';
import {ApiGroupUserService} from './api-group-user.service';

@Component({
  selector: 'admin-api-group-admin-user-list',
  templateUrl: 'api-group-user-list.component.html'
})
export class ApiGroupUserListComponent extends BaseListComponent<Group> implements OnInit {

  apiName: string;

  groupName: string;

  addUsername: string;

  constructor(
    injector: Injector,
    service: ApiGroupUserService
  ) {
    super(injector, service, 'API Group Users - Gateway Admin');
    this.paging = true;
    this.deleteRecordTitle = 'User from Group';
    this.columnNames = ['username', 'created_at', 'actions'];
  }


  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.apiName = params['apiName'];
        this.groupName = params['groupName'];
        this.path = `/apis/${this.apiName}/groups/${this.groupName}/users`;
        this.refresh();
      });
  }

  addUser() {
    const group = this.service.newObject();
    group.group = this.groupName;
    this.service.addObject(group, `/apis/${this.apiName}/groups/${this.groupName}/users/${this.addUsername}`)
      .subscribe(savedGroup => {
        this.refresh();
      });
  }

  get groupEditable() {
    if (this.groupName.indexOf('idir') === 0) {
      return false;
    } else if (this.groupName.indexOf('github') === 0) {
      return false;
    } else {
      return true;
    }
  }
}
