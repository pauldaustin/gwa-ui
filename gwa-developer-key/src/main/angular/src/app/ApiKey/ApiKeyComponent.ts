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
  templateUrl: 'ApiKey.html'
})
export class ApiKeyComponent extends BaseListComponent<ApiKey>{
  acceptTerms: boolean = false;

  appName: string;
  
  appRedirectUrl: string;
  
  constructor(
     injector: Injector,
     service: ApiKeyService
  ) {
    super(injector, service);
  }
  
  ngOnInit(): void {
    super.ngOnInit();
    this.route.queryParams.map(params => params)
      .subscribe(params => {
        this.appName = params['appName'];
        this.appRedirectUrl = params['appRedirectUrl'];
      });
  }
  
  addApiKey(): void {
    let apiKey: ApiKey = new ApiKey();
    this.service.addObject(
      apiKey
    ).then(
      apiKey => this.refresh()
    );
  }
  
  authorizeAccess(): void {
    let apiKey = this.rows[0].key;
    let url = this.appRedirectUrl;
    if (url.indexOf('?') == -1) {
      url += '?';
    } else {
      url += '&';
    }
    url += 'apiKey=' + apiKey;
    this.document.location.href = url;
  }

  get hasApiKey() : boolean {
    return this.rows.length > 0;
  }
}
