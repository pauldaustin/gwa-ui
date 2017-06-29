import {
  Component,
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../../../Component/BaseListComponent';

import { User } from '../User';
import { PluginListComponent } from '../../Plugin/PluginListComponent';
import { PluginService } from '../../Plugin/PluginService';

@Component({
  selector: 'app-user-plugin-list',
  templateUrl: 'UserPluginList.html'
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
    this.route.parent.data.subscribe((data: { user: User }) => {
      const user = data.user;
      this.path = `/users/${user.id}/plugins`;
      this.refresh();
    }
    );
  }
}
