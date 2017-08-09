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
  templateUrl: 'ApiKeyList.html',
  styleUrls: ['ApiKeyList.css']
})
export class ApiKeyListComponent extends BaseListComponent<ApiKey> implements OnInit {
  acceptTerms = false;

  apiKey: string;

  appName: string;

  appRedirectUrl: string;

  appSendMessage = false;

  displayedColumns = ['key', 'actions'];

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
        this.appSendMessage = params['appSendMessage'] === 'true';
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
    if (this.appSendMessage) {
      let messageWindow = window.opener;
      if (!messageWindow) {
        messageWindow = window.parent;
      }
      messageWindow.postMessage(this.apiKey, '*');
    } else {
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
  }

  protected setRows(rows: ApiKey[]) {
    super.setRows(rows);
    if (rows.length > 0) {
      this.hasApiKey = true;
      let setApiKey = true;
      if (this.apiKey) {
        for (const row of rows) {
          if (this.apiKey === row.key) {
            setApiKey = false;
          }
        }
      }
      if (setApiKey) {
        this.apiKey = this.rows[0].key;
      }
      this.acceptTerms = true;
    } else {
      this.hasApiKey = false;
    }
  }
}
