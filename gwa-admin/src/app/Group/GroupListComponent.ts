import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Group } from '../Group/Group';
import { GroupService } from './GroupService';

@Component({
  selector: 'app-group-list',
  templateUrl: 'GroupList.html'
})
export class GroupListComponent extends BaseListComponent<Group> implements OnInit {

  addGroupName: string;

  constructor(
    injector: Injector,
    protected groupService: GroupService
  ) {
    super(injector, groupService);
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'group', name: 'Group', cellTemplate: this.idTemplate, sortable: true },
    ];
    super.ngOnInit();
  }
}
