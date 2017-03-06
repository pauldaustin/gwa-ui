import {
  Component,
  Injector,
  Input 
} from '@angular/core';

import { BaseListComponent }  from '../Component/BaseListComponent';

import { Api } from './Api';
import { ApiService }  from './ApiService';

@Component({
  selector: 'api-list',
  templateUrl: 'ApiList.html'
})
export class ApiListComponent extends BaseListComponent<Api>{
  constructor(
     injector: Injector,
     service: ApiService
  ) {
    super(injector, service);
    this.paging = true;
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'group', name: 'Name', sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  addApi(): void {
    let application: Api = new Api();
    this.service.addObject(
      application
    ).then(
      application => this.refresh()
    );
  }

}
