import { 
  Component, 
  Injector
} from '@angular/core';

import { BaseListComponent } from '../../Component/BaseListComponent';

import { Consumer } from '../Consumer';
import { Group } from '../../Group/Group';
import { ConsumerGroupService } from './ConsumerGroupService';

@Component({
  selector: 'consumer-group-list',
  templateUrl: 'ConsumerGroupList.html'
})
export class ConsumerGroupListComponent extends BaseListComponent<Group> {
  consumer: Consumer;

  addGroupName: string;

  constructor(
    injector: Injector,
    service: ConsumerGroupService
  ) {
    super(injector, service);
    this.paging = true;
    this.filterFields = [
      { prop: "group", name: "Group"},
    ];
    this.filterFieldName = "group";
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: { consumer: Consumer }) => {
        this.consumer = data.consumer;
        this.path = '/consumers/' + data.consumer.username + '/groups';
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
    const group = this.service.newObject();
    group.consumer_id = this.consumer.id;
    group.group = this.addGroupName;
    this.service.addObject(group, this.path)
      .then((savedGroup) => {
        this.refresh();
      });
  }
}