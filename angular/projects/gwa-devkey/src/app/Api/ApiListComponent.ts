import {
  Component,
  Injector
} from '@angular/core';
import {BaseListComponent} from 'revolsys-angular-framework';

import {Api} from './Api';
import {ApiService} from './ApiService';

@Component({
  selector: 'devkey-api-list',
  templateUrl: 'ApiList.html',
  styles: [`
:host {
  display: flex;
  flex-grow: 1;
}
  `]
})
export class ApiListComponent extends BaseListComponent<Api> {

  constructor(
    injector: Injector,
    service: ApiService
  ) {
    super(injector, service, 'Developer API Keys');
    this.columnNames = ['name'];
  }
}
