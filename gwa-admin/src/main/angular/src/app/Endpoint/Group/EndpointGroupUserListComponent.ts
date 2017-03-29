import { 
  Component, 
  Injector
} from '@angular/core';
import { Params } from '@angular/router';

import { BaseListComponent } from '../../Component/BaseListComponent';

import { Group } from '../../Group/Group';
import { EndpointGroupUserService } from './EndpointGroupUserService';

@Component({
  selector: 'endpoint-group-user-list',
  templateUrl: 'EndpointGroupUserList.html'
})
export class EndpointGroupUserListComponent extends BaseListComponent<Group> {
  apiName : string;

  groupName : string;

  addUsername : string;

  constructor(
    injector: Injector,
    service: EndpointGroupUserService
  ) {
    super(injector, service);
    this.paging = true;
  }
  

  ngOnInit() {
    this.columns = [
      { prop: 'username', name: 'User',  sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    this.route.params
      .map(params => {
        return params;
      })
      .subscribe(params => {
        this.apiName = params['apiName'];
        this.groupName = params['groupName'];
        this.path = `/endpoints/${this.apiName}/groups/${this.groupName}/users`;
        this.refresh();
      });
  }
  
  addUser() {
    const group = this.service.newObject();
    group.group = this.groupName;
    this.service.addObject(group, `/endpoints/${this.apiName}/groups/${this.groupName}/users/${this.addUsername}`)
      .then((savedGroup) => {
        this.refresh();
      });
  }

}