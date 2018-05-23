import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Plugin} from '../../Plugin/Plugin';
import {User} from '../User';
import {UserDataService} from './user-data.service';

@Component({
  selector: 'admin-user-data-name-list',
  templateUrl: 'user-data-name-list.component.html'
})
export class UserDataNameListComponent extends BaseListComponent<Plugin> implements OnInit {

  usernameParam: string;

  constructor(
    injector: Injector,
    service: UserDataService
  ) {
    super(injector, service, 'User Data - Gateway Admin');
    this.columnNames = ['name'];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usernameParam = params['username'];
      this.setTitle(`Data - User: ${this.usernameParam} Gateway Admin`);
      this.path = `/users/${this.usernameParam}/data`;
      this.refresh();
    });
  }

}
