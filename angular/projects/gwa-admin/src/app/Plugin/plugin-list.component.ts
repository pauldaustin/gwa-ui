import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Plugin} from './Plugin';
import {PluginService} from './plugin.service';

@Component({
  selector: 'admin-plugin-list',
  templateUrl: 'plugin-list.component.html'
})
export class PluginListComponent extends BaseListComponent<Plugin> implements OnInit {
  protected pluginService: PluginService = this.injector.get(PluginService);

  pluginName: string;

  showUser = true;

  showApi = true;

  showPlugin = true;

  constructor(
    injector: Injector
  ) {
    super(injector, injector.get(PluginService), 'Plugin - Gateway Admin');
  }

  initParams(): void {
    this.route.params.subscribe(params => {
      this.pluginName = params['pluginName'];
      this.setTitle(`Plugin: ${this.pluginName} - Gateway Admin`);
      this.path = `/plugins/${this.pluginName}`;
      this.refresh();
    });
  }

  ngOnInit(): void {
    this.columnNames = [];
    if (this.showPlugin) {
      this.columnNames.push('name');
    }
    if (this.showApi) {
      this.columnNames.push('api_name');
    }
    if (this.showUser) {
      this.columnNames.push('user_username');
    }
    this.columnNames.push('enabled');
    this.columnNames.push('created_at');
    this.columnNames.push('actions');
    this.initParams();
  }
}
