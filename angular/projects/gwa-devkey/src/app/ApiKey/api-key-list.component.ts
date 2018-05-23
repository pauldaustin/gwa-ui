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

  constructor(
    injector: Injector,
    service: ApiKeyService
  ) {
    super(injector, service, 'Developer API Keys');
    this.columnNames = ['key', 'actions'];
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.appName = params['appName'];
        this.appRedirectUrl = params['appRedirectUrl'];
        this.appSendMessage = params['appSendMessage'] === 'true';
        this.refresh();
      });
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

  onDeleted(apiKey: ApiKey): void {
    super.onDeleted(apiKey);
    if (this.rows.length === 0) {
      this.hasApiKey = false;
      this.apiKey = null;
    } else {
      let setApiKey = true;
      if (this.apiKey) {
        for (const row of this.rows) {
          if (this.apiKey === row) {
            setApiKey = false;
          }
        }
      }
      if (setApiKey) {
        this.apiKey = this.rows[0];
      }
    }
  }

  protected setRows(rows: ApiKey[]) {
    super.setRows(rows);
    if (rows.length > 0) {
      this.hasApiKey = true;
      let setApiKey = true;
      if (this.apiKey) {
        for (const row of rows) {
          if (this.apiKey.key === row.key) {
            this.apiKey = row;
            setApiKey = false;
          }
        }
      }
      if (setApiKey) {
        this.apiKey = this.rows[0];
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
      response => {
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          this.authService.roles.push('gwa_github_developer');
          this.refresh();
          return null;
        }
      }
    );
  }
}
