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
  templateUrl: 'PluginList.html'
})
export class PluginListComponent extends BaseListComponent<Plugin> {

  pluginName : string;

  @ViewChild('apiT') apiTemplate: TemplateRef<any>;

  @ViewChild('consumerT') consumerTemplate: TemplateRef<any>;

  showConsumer : boolean = true;

  showApi : boolean = true;

  showPlugin : boolean = false;
  
  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
    this.paging = true;
  }

  initParams(): void {
    this.route.params.subscribe(params => {
      this.pluginName = params['pluginName']; 
      this.path = `/plugins/${this.pluginName}`;
      this.refresh();
    });
  }
  
  ngOnInit(): void {
    this.columns = [];
    if (this.showApi) {
      this.columns.push({ prop: 'api_name', name: 'API', cellTemplate: this.apiTemplate, sortable: false }); 
    }
    if (this.showPlugin) {
      this.columns.push({ prop: 'name', name: 'Plugin', cellTemplate: this.idTemplate,  sortable: false }); 
    }
    if (this.showConsumer) {
      this.columns.push({ prop: 'consumer_username', name: 'Consumer', cellTemplate: this.consumerTemplate,  sortable: false });
    }
    this.columns.push({ prop: 'enabled', name: 'Enabled', cellTemplate: this.flagTemplate, sortable: false });
    this.columns.push({ prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false });
    this.columns.push({ prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false });
    this.initParams();
  }
}