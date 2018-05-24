import {BehaviorSubject} from 'rxjs';
import {
  Component,
  Injector
} from '@angular/core';
import {BaseListComponent} from 'revolsys-angular-framework';

import {Api} from './Api';
import {ApiService} from './api.service';
import {RateLimitService} from './rateLimit.service';

@Component({
  selector: 'devkey-api-list',
  templateUrl: 'api-list.component.html',
  styles: [`
:host {
  display: flex;
  flex-grow: 1;
}
.mat-expansion-panel-header-title,
.mat-expansion-panel-header-description {
  flex-basis:0;
}
  `]
})
export class ApiListComponent extends BaseListComponent<Api> {

  constructor(
    injector: Injector,
    service: ApiService,
    private rateLimitService: RateLimitService
  ) {
    super(injector, service, 'Developer API Keys');
    this.columnNames = ['name'];
  }

  get apis(): Api[] {
    return this.arrayDataSource.data;
  }

  apiUrl(api: Api): string {
    const hosts = api.hosts;
    if (hosts && hosts.length > 0) {
      let url = `https://${hosts[0]}`;
      const uris = api.uris;
      if (uris && uris.length > 0) {
        url += uris[0];
      }
      return url;
    } else {
      return null;
    }
  }

  rateLimit(api: Api): BehaviorSubject<any> {
    let rateLimit = api['rateLimit'];
    if (!rateLimit) {
      rateLimit = new BehaviorSubject<any>({});
      api['rateLimit'] = rateLimit;
      this.rateLimitService.getObject(api.name)
        .subscribe(results => rateLimit.next(results));
    }
    return rateLimit;
  }
}
