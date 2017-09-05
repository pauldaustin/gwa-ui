import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-user-data-view-tabs',
  template: `
<nav md-tab-nav-bar>
  <a md-tab-link [routerLink]="['../../..']" >User: {{usernameParam}}</a>

  <a md-tab-link [routerLink]="['../..']" >Data</a>

  <a md-tab-link [routerLink]="['..']">{{dataName}}</a>

  <a md-tab-link [routerLink]="['.']" active="true">{{id}}</a>
</nav>
<app-user-data-view></app-user-data-view>
`
})
export class UserDataViewTabsComponent implements OnInit {

  usernameParam: string;

  dataName: string;

  id: string;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params
      .map(params => {
        return params;
      })
      .subscribe(params => {
        this.usernameParam = params['username'];
        this.dataName = params['dataName'];
        this.id = params['id'];
        if (this.id === '_add_') {
          this.id = `Add ${this.dataName}`;
        }
      });
  }
}
