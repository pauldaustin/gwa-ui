import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {BaseListComponent} from '../../../shared/Component/BaseListComponent';

import {Plugin} from '../../Plugin/Plugin';
import {User} from '../User';
import {UserDataService} from './user-data.service';

@Component({
  selector: 'app-user-data-name-list',
  templateUrl: 'user-data-name-list.component.html'
})
export class UserDataNameListComponent extends BaseListComponent<Plugin> implements OnInit {
  usernameParam: string;

  constructor(
    injector: Injector,
    service: UserDataService
  ) {
    super(injector, service, 'User Data - Gateway Admin');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usernameParam = params['username'];
      this.setTitle(`Data - User: ${this.usernameParam} Gateway Admin`);
      this.path = `/users/${this.usernameParam}/data`;
      this.refresh();
    });

    this.columns = [
      {prop: 'name', name: 'Data', cellTemplate: this.idTemplate, sortable: true},
    ];
  }

}
