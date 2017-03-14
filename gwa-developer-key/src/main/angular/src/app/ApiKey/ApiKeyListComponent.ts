import {
  Component,
  Injector,
  Input 
} from '@angular/core';

import { BaseListComponent }  from '../Component/BaseListComponent';

import { ApiKey } from './ApiKey';
import { ApiKeyService }  from './ApiKeyService';

@Component({
  selector: 'apiKey-list',
  templateUrl: 'app/ApiKey/ApiKeyList.html'
})
export class ApiKeyListComponent extends BaseListComponent<ApiKey>{
  constructor(
     injector: Injector,
     service: ApiKeyService
  ) {
    super(injector, service);
    this.paging = true;
  }

  ngOnInit(): void {
    this.columns = [
      { name: 'Key', sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  addApiKey(): void {
    let apiKey: ApiKey = new ApiKey();
    this.service.addObject(
      apiKey
    ).then(
      apiKey => this.refresh()
    );
  }

}
