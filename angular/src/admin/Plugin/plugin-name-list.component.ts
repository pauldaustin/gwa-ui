import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';

import {Plugin} from './Plugin';
import {PluginService} from './plugin.service';

@Component({
  selector: 'app-plugin-name-list',
  templateUrl: 'plugin-name-list.component.html'
})
export class PluginNameListComponent extends BaseListComponent<Plugin> implements OnInit {
  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service, 'Plugins - Gateway Admin');
  }

  ngOnInit(): void {
    this.columns = [
      {prop: 'name', name: 'Plugin', cellTemplate: this.idTemplate, sortable: true},
    ];
    super.ngOnInit();
  }
}
