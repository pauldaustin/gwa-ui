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
  selector: 'plugin-name-list',
  templateUrl: 'app/Plugin/PluginNameList.html'
})
export class PluginNameListComponent extends BaseListComponent<Plugin> {

  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
    this.paging = true;
  }

  ngOnInit(): void {    
    this.columns = [
      { prop: 'name', name: 'Plugin', cellTemplate: this.idTemplate,  sortable: false },
    ];
    super.ngOnInit();
  }
}