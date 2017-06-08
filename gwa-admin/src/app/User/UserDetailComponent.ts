import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './User';

@Component({
  selector: 'app-user-detail',
  template: `
<nav md-tab-nav-bar *ngIf="user">
  <a md-tab-link
     [routerLink]="['.']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >User: {{user.username}}</a>
  <a md-tab-link
     [routerLink]="['groups']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Groups</a>
  <a md-tab-link
     [routerLink]="['plugins']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Plugins</a>
</nav>
<router-outlet></router-outlet>
  `
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { user: User }) => {
        this.user = data.user;
      }
      );
  }
}
