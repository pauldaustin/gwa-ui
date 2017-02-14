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
  moduleId: module.id,
  selector: 'plugin-list',
  templateUrl: 'PluginListComponent.html'
})
export class PluginListComponent extends BaseListComponent<Plugin> {
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
      this.pluginName = this.pluginNames[0];
    });
  }
 
  getObjects() : Array<Plugin> {
    return this.api.plugins;
  }
}
