import {
  Component,
  Injector,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {Api} from '../Api';
import {PluginListComponent} from '../../Plugin/plugin-list.component';

@Component({
  selector: 'admin-api-plugin-list',
  templateUrl: 'api-plugin-list.component.html'
})
export class ApiPluginListComponent extends PluginListComponent {
  api: Api;

  pluginNames: string[];

  pluginName: string;

  constructor(
    injector: Injector
  ) {
    super(injector);
    this.pluginService.getPluginNames().subscribe(pluginNames => {
      this.pluginNames = pluginNames;
      if (pluginNames && pluginNames.length > 0) {
        this.pluginName = this.pluginNames[0];
      }
    });
    this.showApi = false;
    this.showUser = false;
  }

  initParams(): void {
    this.route.parent.data.subscribe((data: {api: Api}) => {
      this.api = data.api;
      this.path = `/apis/${this.api.id}/plugins`;
      this.refresh();
    }
    );
  }
}
