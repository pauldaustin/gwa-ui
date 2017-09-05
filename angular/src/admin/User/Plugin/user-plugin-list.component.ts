import {
  Component,
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {BaseListComponent} from '../../../shared/Component/BaseListComponent';

import {User} from '../User';
import {PluginListComponent} from '../../Plugin/plugin-list.component';

@Component({
  selector: 'app-user-plugin-list',
  templateUrl: 'user-plugin-list.component.html'
})
export class UserPluginListComponent extends PluginListComponent {
  usernameParam: string;

  constructor(
    injector: Injector
  ) {
    super(injector);
    this.showUser = false;
  }

  initParams(): void {
    this.route.parent.data.subscribe((data: {user: User}) => {
      const user = data.user;
      this.usernameParam = user.username;
      if (!this.usernameParam) {
        this.usernameParam = user.id;
      }
      this.path = `/users/${user.id}/plugins`;
      this.refresh();
    }
    );
  }
}
