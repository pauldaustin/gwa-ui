import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from './Api';

@Component({
  selector: 'api-detail',
  template: `
<nav md-tab-nav-bar *ngIf="api">
  <a md-tab-link
     [routerLink]="['.']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >API: {{api.name}}</a>
  <a md-tab-link
     [routerLink]="['plugins']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Plugins</a>
  <a md-tab-link
     [routerLink]="['groups']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Groups</a>
</nav>
<router-outlet></router-outlet>
  `
})
export class ApiDetailComponent implements OnInit {
  api: Api;

  constructor(
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { api: Api }) => {
        this.api = data.api;
      }
      );
  }
}
