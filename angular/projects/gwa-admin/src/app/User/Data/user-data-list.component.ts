import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Plugin} from '../../Plugin/Plugin';
import {UserDataService} from './user-data.service';

@Component({
  selector: 'admin-user-data-list',
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
    this.columnNames = ['label', 'created_at', 'actions'];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usernameParam = params['username'];
      this.dataName = params['dataName'];
      this.setTitle(`Data: ${this.dataName} - Gateway Admin`);
      this.path = `/users/${this.usernameParam}/data/${this.dataName}`;
      this.refresh();
    });
  }

}
