import 'rxjs/add/operator/switchMap';

import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  FormControl,
}            from '@angular/forms';

import { Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Api }         from '../Api/Api';
import { Plugin }      from './Plugin';
import { PluginService }      from './PluginService';
import { PluginDetailComponent }      from './PluginDetailComponent';

@Component({
  selector: 'plugin-add',
  templateUrl: 'PluginDetailComponent.html'
})
export class PluginAddComponent extends PluginDetailComponent {
  @Input() api: Api;
  
  @Input() modal: ModalDirective;
 
  goBack(): void {
    this.modal.hide();
  }

  ngOnInit(): void {
  }

  save(): void {
   this.service.addObject(this.plugin)
     .then(plugin => this.modal.hide());
  }

  setPluginName(pluginName: string) {
    let plugin = new Plugin();
    plugin.name = pluginName;
    plugin.api = this.api;
    this.plugin = plugin;
    super.setPluginName(pluginName);
  }
}
