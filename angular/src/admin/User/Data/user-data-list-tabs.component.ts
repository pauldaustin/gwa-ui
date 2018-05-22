import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-user-data-list-tabs',
  template: `
<nav mat-tab-nav-bar>
  <a mat-tab-link [routerLink]="['../..']" >User: {{usernameParam}}</a>

  <a mat-tab-link [routerLink]="['..']" >Data</a>

  <a mat-tab-link [routerLink]="['.']" active="true">{{dataName}}</a>
</nav>
<app-user-data-list></app-user-data-list>
`
})
export class UserDataListTabsComponent implements OnInit {

  usernameParam: string;

  dataName: string;

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
      });
  }
}
