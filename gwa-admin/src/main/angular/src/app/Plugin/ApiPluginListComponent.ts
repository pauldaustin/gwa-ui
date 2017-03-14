import {
  Component,
  Injector,
  Input 
} from '@angular/core';

import { BaseListComponent }  from '../Component/BaseListComponent';

import { Api } from '../Api/Api';

import { Plugin } from './Plugin';

import { PluginService }  from './PluginService';

@Component({
  selector: 'api-plugin-list',
  templateUrl: 'ApiPluginList.html'
})
export class ApiPluginListComponent extends BaseListComponent<Plugin> {
  @Input() api: Api;
    
  pluginNames: string[];
    
  pluginName: string;

  constructor(
     injector: Injector,
     service: PluginService
  ) {
    super(injector, service);
    service.getPluginNames().then(pluginNames => {
      this.pluginNames = pluginNames;
      if (pluginNames && pluginNames.length > 0) {
        this.pluginName = this.pluginNames[0];
      }
    });
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', cellTemplate: this.idTemplate },
      { name: 'Enabled', cellTemplate: this.flagTemplate },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  refresh() {
    this.rows = this.api.plugins;
  }
}