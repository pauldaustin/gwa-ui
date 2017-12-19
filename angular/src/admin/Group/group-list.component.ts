import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';

import {Group} from '../Group/Group';
import {GroupService} from './group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: 'group-list.component.html'
})
export class GroupListComponent extends BaseListComponent<Group> implements OnInit {

  addGroupName: string;

  constructor(
    injector: Injector,
    protected groupService: GroupService
  ) {
    super(injector, groupService, 'Groups - Gateway Admin');
  }

  ngOnInit(): void {
    this.columns = [
      {prop: 'group', name: 'Group', cellTemplate: this.idTemplate, sortable: true},
      {prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: true},
      {prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: true},
    ];
    super.ngOnInit();
  }

  addGroup() {
    let hasGroup = false;
    for (const group of this.rows) {
      if (group.group === this.addGroupName) {
        hasGroup = true;
      }
    }
    if (hasGroup) {
      this.router.navigate([this.addGroupName], {relativeTo: this.route});
    } else {
      this.groupService.addObject({
        group: this.addGroupName
      }).then(group => {
        if (group) {
          this.router.navigate([group.group], {relativeTo: this.route});
        }
      });
    }
  }
}
