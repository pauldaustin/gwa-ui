import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consumer } from './Consumer';

@Component({
  selector: 'consumer-detail',
  template: `
<nav md-tab-nav-bar *ngIf="consumer">
  <a md-tab-link
     [routerLink]="['.']"
     routerLinkActive
     #rla="routerLinkActive"
     [active]="rla.isActive"
  >Consumer: {{consumer.username}}</a>
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
export class ConsumerDetailComponent  {
  consumer : Consumer;
 
  constructor(
    protected route: ActivatedRoute,
  ) {
  }
  
  ngOnInit() {
    this.route.data
      .subscribe((data: { consumer: Consumer }) => {
        this.consumer = data.consumer;
      }
    );
  }
}
