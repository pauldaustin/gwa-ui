import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Plugin} from './Plugin';
import {PluginService} from './plugin.service';

@Component({
  selector: 'admin-plugin-name-list',
  templateUrl: 'plugin-name-list.component.html'
})
export class PluginNameListComponent extends BaseListComponent<Plugin>  {

  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service, 'Plugins - Gateway Admin');
    this.columnNames = ['name'];
  }
}
