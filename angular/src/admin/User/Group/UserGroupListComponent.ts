import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import { BaseListComponent } from '../../../shared/Component/BaseListComponent';

import { User } from '../User';
import { Group } from '../../Group/Group';
import { UserGroupService } from './UserGroupService';

@Component({
  selector: 'app-user-group-list',
  templateUrl: 'UserGroupList.html'
})
export class UserGroupListComponent extends BaseListComponent<Group> implements OnInit {
  user: User;

  addGroupName: string;

  constructor(
    injector: Injector,
    service: UserGroupService
  ) {
    super(injector, service);
    this.paging = true;
    this.filterFields = [
      { prop: 'group', name: 'Group' },
    ];
    this.filterFieldName = 'group';
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
        this.path = '/users/' + data.user.username + '/groups';
      }
      );
    this.columns = [
      { prop: 'group', name: 'Group', sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  addGroup() {
    if (this.addGroupName) {
      const group = this.service.newObject();
      group.user_id = this.user.id;
      group.group = this.addGroupName.toLowerCase();
      this.service.addObject(group, this.path)
        .then((savedGroup) => {
          this.refresh();
        });
    }
  }
}
