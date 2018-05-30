import {BasicAuth} from '../BasicAuth/BasicAuth';
import {BasicAuthService} from '../BasicAuth/basic-auth.service';
import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {ApiKey} from './ApiKey';
import {ApiKeyService} from './api-key.service';

@Component({
  selector: 'devkey-api-key-list',
  templateUrl: 'api-key-list.component.html',
  styleUrls: ['api-key-list.component.css']
})
export class ApiKeyListComponent extends BaseListComponent<ApiKey> implements OnInit {
  acceptTerms = false;

  apiKey: ApiKey;

  appName: string;

  appRedirectUrl: string;

  appSendMessage = false;

  hasApiKey = false;

  basicAuth: BasicAuth;

  constructor(
    injector: Injector,
    service: ApiKeyService,
    private basicAuthService: BasicAuthService
  ) {
    super(injector, service, 'Developer API Keys');
    this.columnNames = ['key', 'expiryDays', 'actions'];
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.appName = params['appName'];
        this.appRedirectUrl = params['appRedirectUrl'];
        this.appSendMessage = params['appSendMessage'] === 'true';
        this.refresh();
      });
    this.basicAuthService.getObject(null)
      .subscribe(basicAuth => this.basicAuth = basicAuth);
    super.ngOnInit();
  }

  addApiKey(): void {
    const apiKey: ApiKey = new ApiKey();
    this.service.addObject(
      apiKey
    ).subscribe(
      apiKey2 => {
        this.hasApiKey = true;
        this.refresh();
        this.apiKey = apiKey2;
      }
      );
  }

  deleteApiKey(): void {
    this.deleteObject(this.apiKey);
  }

  authorizeAccess(): void {
    const key = this.apiKey.key;
    if (this.appSendMessage) {
      let messageWindow = window.opener;
      if (!messageWindow) {
        messageWindow = window.parent;
      }
      messageWindow.postMessage(key, '*');
    } else {
      let url = this.appRedirectUrl;
      if (url.indexOf('?') === -1) {
        url += '?';
      } else {
        url += '&';
      }
      url += 'apiKey=' + key;
      this.document.location.href = url;
    }
  }

  expiryDays(apiKey: ApiKey): number {
    const millisPerDay = 24.0 * 60 * 60 * 1000;
    const createdAtDay = apiKey.created_at;
    const maxAgeDays = apiKey.maxAgeDays;
    const expiryDays = Math.floor(createdAtDay / millisPerDay + maxAgeDays - Date.now() / millisPerDay);
    if (expiryDays > 0) {
      return expiryDays;
    } else {
      return 0;
    }
  }

  onDeleted(apiKey: ApiKey): void {
    super.onDeleted(apiKey);
    const records = this.arrayDataSource.data;
    if (records.length === 0) {
      this.hasApiKey = false;
      this.apiKey = null;
    } else {
      let setApiKey = true;
      if (this.apiKey) {
        for (const row of records) {
          if (this.apiKey === row) {
            setApiKey = false;
          }
        }
      }
      if (setApiKey) {
        this.apiKey = records[0];
      }
    }
  }

  protected setRows(records: ApiKey[]) {
    this.arrayDataSource.data = records;
    if (records.length > 0) {
      this.hasApiKey = true;
      let setApiKey = true;
      if (this.apiKey) {
        for (const record of records) {
          if (this.apiKey.key === record.key) {
            this.apiKey = record;
            setApiKey = false;
          }
        }
      }
      if (setApiKey) {
        this.apiKey = records[0];
      }
      this.acceptTerms = true;
    } else {
      this.hasApiKey = false;
    }
  }

  requestAccess(): void {
    const url = this.service.getUrl('/organizations/_join');
    this.service.httpRequest(
      http => {
        return http.post(
          url,
          '',
          {headers: {'Content-Type': 'application/json'}}
        );
      },
      response => response
    ).subscribe(response => {
      if (response['error']) {
        this.showError(response['error']);
      } else {
        this.authService.roles.push('gwa_github_developer');
        this.refresh();
      }
    });
  }

  setBasicAuthPassword() {

  }
}
