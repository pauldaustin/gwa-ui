import {
  Component,
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {BaseListComponent} from '../../../shared/Component/BaseListComponent';

import {User} from '../User';
import {PluginListComponent} from '../../Plugin/plugin-list.component';
import {PluginService} from '../../Plugin/plugin.service';

@Component({
  selector: 'app-user-plugin-list',
  templateUrl: 'user-plugin-list.component.html'
})
export class UserPluginListComponent extends PluginListComponent {
  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
    this.showUser = false;
  }

  initParams(): void {
    this.route.parent.data.subscribe((data: {user: User}) => {
      const user = data.user;
      this.path = `/users/${user.id}/plugins`;
      this.refresh();
    }
    );
  }
}