import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../Api/Api';

@Component({
  selector: 'endpoint-detail',
  template: `
<page-not-found *ngIf="!api"></page-not-found>
<nav md-tab-nav-bar *ngIf="api">
  <a md-tab-link
     [routerLink]="['.']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Endpoint: {{api.name}}</a>
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
export class EndpointDetailComponent  {
  api : Api;
 
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
