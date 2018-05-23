import {
  Component,
  Injector,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {Api} from '../../Api';
import {PluginListComponent} from '../../../Plugin/plugin-list.component';
import {PluginService} from '../../../Plugin/plugin.service';

@Component({
  selector: 'admin-api-plugin-user-list',
  templateUrl: 'api-plugin-user-list.component.html'
})
export class ApiPluginUserListComponent extends PluginListComponent {
  api: Api;

  pluginName: string;

  addUsername: string;

  constructor(
    injector: Injector
  ) {
    super(injector);
    this.showApi = false;
    this.showUser = true;
    this.showPlugin = false;
  }

  initParams(): void {
    this.route.params
      .subscribe(params => {
        this.pluginName = params['pluginName'];
      });
    this.route.data.subscribe((data: {api: Api}) => {
      this.api = data.api;
      this.path = `/apis/${this.api.id}/plugins/${this.pluginName}/users`;
      this.refresh();
    }
    );
  }

}
