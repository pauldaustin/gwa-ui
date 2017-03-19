import {
  Component,
  Injector,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Api } from '../Api/Api';
import { PluginListComponent } from './PluginListComponent';
import { PluginService } from './PluginService';

@Component({
  selector: 'api-plugin-list',
  templateUrl: 'app/Plugin/ApiPluginList.html'
})
export class ApiPluginListComponent extends PluginListComponent {
  api: Api;
    
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
    this.route.parent.data
      .subscribe((data: { api: Api }) => {
        this.api = data.api;
        this.filterFieldName = 'api_id';
        this.filterValue = data.api.id;
      }
    );
    super.ngOnInit();
  }
}
