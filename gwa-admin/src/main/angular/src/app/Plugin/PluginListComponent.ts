import { 
  Component, 
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Plugin } from './Plugin';
import { PluginService } from './PluginService';

@Component({
  selector: 'plugin-list',
  templateUrl: 'app/Plugin/PluginList.html'
})
export class PluginListComponent extends BaseListComponent<Plugin> {

  @ViewChild('apiT') apiTemplate: TemplateRef<any>;

  @ViewChild('consumerT') consumerTemplate: TemplateRef<any>;

  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
    this.paging = true;
  }

  ngOnInit(): void {    
    this.columns = [
      { prop: 'api_name', name: 'API', cellTemplate: this.apiTemplate, sortable: false },
      { prop: 'name', name: 'Plugin', cellTemplate: this.idTemplate,  sortable: false },
      { prop: 'consumer_username', name: 'Consumer', cellTemplate: this.consumerTemplate,  sortable: false },
      { prop: 'enabled', name: 'Enabled', cellTemplate: this.flagTemplate, sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }
}