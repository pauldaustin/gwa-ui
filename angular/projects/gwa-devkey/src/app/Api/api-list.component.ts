import {BehaviorSubject} from 'rxjs';
import {
  Component,
  Injector
} from '@angular/core';
import {BaseListComponent} from 'revolsys-angular-framework';

import {Api} from './Api';
import {ApiService} from './api.service';
import {RateLimitService} from './rateLimit.service';
import {DataSource} from '@angular/cdk/table';
import {MatTableDataSource} from '@angular/material';

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
.mat-column-limit,
.mat-column-period {
  width: 100px;
}
  `]
})
export class ApiListComponent extends BaseListComponent<Api> {
  limitColumns = ['period', 'limit'];

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

  rateLimit(api: Api): DataSource<any> {
    let dataSource = api['rateLimit'];
    if (!dataSource) {
      dataSource = new MatTableDataSource<any>();
      api['rateLimit'] = dataSource;
      this.rateLimitService.getObject(api.name)
        .subscribe(limits => {
          const records = [];
          for (const limitPeriod of Object.keys(limits)) {
            const limit = limits[limitPeriod];
            records.push({
              period: limitPeriod,
              limit: limit
            });
          }
          dataSource.data = records;
        });
    }
    return dataSource;
  }
}
