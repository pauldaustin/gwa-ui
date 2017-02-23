import {
  Component,
  Injector,
  Input 
} from '@angular/core';

import { BaseListComponent }  from '../Component/BaseListComponent';

import { ApiKey } from './ApiKey';
import { Api } from '../Api/Api';
import { ApiKeyService }  from './ApiKeyService';

@Component({
  moduleId: module.id,
  selector: 'apiKey-list',
  templateUrl: 'ApiKeyListComponent.html'
})
export class ApiKeyListComponent extends BaseListComponent<ApiKey>{
  @Input() api: Api;

  constructor(
     injector: Injector,
     service: ApiKeyService
  ) {
    super(injector, service);
  }

  create(userTitle: string): void {
    userTitle = userTitle.trim();
    if (userTitle) {
      let apiKey: ApiKey = new ApiKey();
      apiKey.api = this.api;
      apiKey.user_title = userTitle;
      this.service.addObject(apiKey);
    }
  }
}
