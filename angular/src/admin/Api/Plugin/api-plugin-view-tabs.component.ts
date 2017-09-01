import 'rxjs/add/operator/switchMap';

import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Api} from '../Api';
import {Plugin} from '../../Plugin/Plugin';

@Component({
  selector: 'app-api-plugin-view-tabs',
  template: `
<nav md-tab-nav-bar *ngIf="plugin">
  <a md-tab-link [routerLink]="['../..']" >API: {{api.name}}</a>

  <a md-tab-link [routerLink]="['..']" >Plugins</a>

  <a md-tab-link [routerLink]="['.']" active="true">{{plugin.name}}</a>

  <a md-tab-link [routerLink]="['users']" >Users</a>
</nav>
<router-outlet></router-outlet>
`
})
export class ApiPluginViewTabsComponent implements OnInit {
  api: Api;
  plugin: Plugin;

  constructor(
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {plugin: Plugin}) => {
        this.plugin = data.plugin;
        this.api = this.plugin.api;
      }
      );
  }
}
