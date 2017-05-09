import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import {
  Component,
  Injector 
} from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute, 
  Params 
} from '@angular/router';
import { BaseComponent } from '../Component/BaseComponent';
import { AppAuthorization } from './AppAuthorization';
import { Api } from './Api';
import { ApiService } from './ApiService';

@Component({
  selector: 'api-authorize',
  template: `
<div *ngIf="!redirectUrl" class="alert alert-danger" role="alert">A redirectUrl parameter must be specified. Go back to the
previous page and contact the owner of that page to report the problem.</div>

<div *ngIf="redirectUrl && appAuthorization">
  <ol class="breadcrumb">
    <li><a routerLink="/ui/apis">APIs</a></li>
    <li>{{appAuthorization.appName}}</li>
    <li class="active">Authorize</li>
  </ol>

  <h1>Authorize Access to API {{appAuthorization.appName}}</h1>
  
  

  <div class="btn-toolbar" role="toolbar">
    <button (click)="cancel()" class="btn btn-default" type="button">Cancel</button>
    <button (click)="confirm()" class="btn btn-success" type="button">Authorize</button>
  </div>
</div>
`
})
export class ApiAuthorizeComponent extends BaseComponent<Api> {
  appAuthorization : AppAuthorization;
  redirectUrl: string;
  
  constructor(
    injector:Injector,
    service: ApiService,
  ) {
    super(injector, service);
  }
  
  ngOnInit(): void {
    this.route.queryParams.map(params => params['redirectUrl'])
      .subscribe(redirectUrl => this.redirectUrl = redirectUrl);
  
    this.route.params.switchMap((params: Params) => {
      let appAuthorization = new AppAuthorization();
      appAuthorization.appName = params['appName'];
      return Promise.resolve(appAuthorization);
    }).subscribe(appAuthorization => this.appAuthorization = appAuthorization);
  }
  
  confirm() {
  }
  
  cancel() {
  }
}
