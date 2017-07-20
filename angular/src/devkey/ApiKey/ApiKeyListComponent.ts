import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';

import {ApiKey} from './ApiKey';
import {ApiKeyService} from './ApiKeyService';

@Component({
  selector: 'app-api-key-list',
  templateUrl: 'ApiKeyList.html'
})
export class ApiKeyListComponent extends BaseListComponent<ApiKey> implements OnInit {
  acceptTerms = false;

  appName: string;

  appRedirectUrl: string;

  hasApiKey = false;

  constructor(
    injector: Injector,
    service: ApiKeyService
  ) {
    super(injector, service, 'Developer API Keys');
  }

  ngOnInit(): void {
    this.columns = [
      {name: 'API Key', prop: 'key', sortable: true},
      {name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false}
    ];
    super.ngOnInit();
    this.route.queryParams.map(params => params)
      .subscribe(params => {
        this.appName = params['appName'];
        this.appRedirectUrl = params['appRedirectUrl'];
        this.refresh();
      });
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
    const apiKey = this.rows[0];
    let url = this.appRedirectUrl;
    if (url.indexOf('?') === -1) {
      url += '?';
    } else {
      url += '&';
    }
    url += 'apiKey=' + apiKey;
    this.document.location.href = url;
  }

  protected setRows(rows: ApiKey[]) {
    super.setRows(rows);
    if (rows.length > 0) {
      this.acceptTerms = true;
    }
  }
}
