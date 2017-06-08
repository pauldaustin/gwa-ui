import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../Api/Api';

@Component({
  selector: 'app-endpoint-detail',
  template: `
<app-page-not-found *ngIf="!api"></app-page-not-found>
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
export class EndpointDetailComponent implements OnInit {
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
