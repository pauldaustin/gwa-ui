import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import { BaseComponent } from '../Component/BaseComponent';

import { ApiKey } from './ApiKey';
import { ApiKeyService } from './ApiKeyService';

@Component({
  selector: 'app-api-key-list',
  templateUrl: 'ApiKey.html'
})
export class ApiKeyComponent extends BaseComponent<ApiKey> implements OnInit {
  acceptTerms = false;

  appName: string;

  appRedirectUrl: string;

  apiNames: string[] = [];

  apiKey: string;

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
        this.refresh();
      });
  }

  refresh(): void {
    this.service.getObject('')
      .then(response => {
        this.apiNames = response.apiNames;
        this.apiKey = response.apiKey;
        if (this.apiKey) {
          this.acceptTerms = true;
        }
      }
      );
  }

  addApiKey(): void {
    const apiKey: ApiKey = new ApiKey();
    this.service.addObject(
      apiKey
    ).then(
      apiKey2 => this.refresh()
      );
  }

  authorizeAccess(): void {
    const apiKey = this.apiKey;
    let url = this.appRedirectUrl;
    if (url.indexOf('?') === -1) {
      url += '?';
    } else {
      url += '&';
    }
    url += 'apiKey=' + apiKey;
    this.document.location.href = url;
  }

  get hasApiKey(): boolean {
    return this.apiKey != null;
  }
}
