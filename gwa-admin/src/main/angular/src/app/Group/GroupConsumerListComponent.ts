import { 
  Component, 
  Injector
} from '@angular/core';
import { Params } from '@angular/router';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Group } from './Group';
import { GroupConsumerService } from './GroupConsumerService';

@Component({
  selector: 'consumer-group-list',
  templateUrl: 'app/Group/GroupConsumerList.html'
})
export class GroupConsumerListComponent extends BaseListComponent<Group> {

  groupName : string;

  addUsername : string;

  constructor(
    injector: Injector,
    service: GroupConsumerService
  ) {
    super(injector, service);
    this.paging = true;
  }
  

  ngOnInit() {
    this.columns = [
      { prop: 'username', name: 'Consumer', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    this.route.params
      .map(params => params['groupName'])
      .subscribe(groupName => {
        this.groupName = groupName;
        this.path = `/groups/${groupName}`;
        this.refresh();
      });
  }
  
  addConsumer() {
    const group = this.service.newObject();
    group.group = this.groupName;
    this.service.addObject(group, `/consumers/${this.addUsername}/groups`)
      .then((savedGroup) => {
        this.refresh();
      });
  }

}