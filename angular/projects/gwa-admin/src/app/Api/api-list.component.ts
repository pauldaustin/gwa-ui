import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Api} from './Api';
import {ApiService} from './api.service';

@Component({
  selector: 'admin-api-list',
  templateUrl: 'api-list.component.html'
})
export class ApiListComponent extends BaseListComponent<Api> {

  constructor(
    injector: Injector,
    protected apiService: ApiService
  ) {
    super(injector, apiService, 'APIs - Gateway Admin');
    this.columnNames = ['name', 'hosts', 'uris', 'created_at', 'actions'];
    this.filterFields = [
      {prop: 'name', name: 'Name'},
      {prop: 'hosts', name: 'Host'},
      {prop: 'uris', name: 'Path'},
    ];
    this.filterFieldName = 'name';
  }
}
