import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {BaseListComponent} from '../../../shared/Component/BaseListComponent';

import {Plugin} from '../../Plugin/Plugin';
import {UserDataService} from './user-data.service';

@Component({
  selector: 'app-user-data-list',
  templateUrl: 'user-data-list.component.html'
})
export class UserDataListComponent extends BaseListComponent<Plugin> implements OnInit {

  usernameParam: string;

  dataName: string;

  constructor(
    injector: Injector,
    service: UserDataService
  ) {
    super(injector, service, 'User Data - Gateway Admin');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usernameParam = params['username'];
      this.dataName = params['dataName'];
      this.setTitle(`Data: ${this.dataName} - Gateway Admin`);
      this.path = `/users/${this.usernameParam}/data/${this.dataName}`;
      this.columns = [];
      this.columns.push({prop: 'label', name: this.dataName, cellTemplate: this.idTemplate, sortable: true});
      this.columns.push({prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: true});
      this.columns.push({prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false});
      this.refresh();
    });
  }

}
