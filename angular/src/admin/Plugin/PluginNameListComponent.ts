import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../../shared/Component/BaseListComponent';

import { Plugin } from './Plugin';
import { PluginService } from './PluginService';

@Component({
  selector: 'app-plugin-name-list',
  templateUrl: 'PluginNameList.html',
  styles: [`
:host {
  flex-grow: 1;
  display: flex;
  height: 100%;
}
  `]
})
export class PluginNameListComponent extends BaseListComponent<Plugin> implements OnInit {

  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'name', name: 'Plugin', cellTemplate: this.idTemplate, sortable: true },
    ];
    super.ngOnInit();
  }
}
