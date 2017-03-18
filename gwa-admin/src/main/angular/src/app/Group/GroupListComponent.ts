import { 
  Component,
  Injector,
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Group } from '../Group/Group';
import { GroupService } from './GroupService';

@Component({
  selector: 'group-list',
  templateUrl: 'app/Group/GroupList.html'
})
export class GroupListComponent extends BaseListComponent<Group> {

  addGroupName : string;

  constructor(
    injector: Injector,
    protected groupService: GroupService
  ) {
    super(injector, groupService);
    this.paging = true;
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'group', name: 'Group', cellTemplate: this.idTemplate, sortable: false },
    ];
    super.ngOnInit();
  }
}