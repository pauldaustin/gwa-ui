import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import {BaseListComponent} from 'revolsys-angular-framework';

import {Api} from '../../Api/Api';
import {Group} from '../../Group/Group';

@Component({
  selector: 'admin-endpoint-group-list',
  template: `
  <mat-table #table [dataSource]="dataSource" >

    <ng-container matColumnDef="group">
      <mat-header-cell *matHeaderCellDef>Group</mat-header-cell>
      <mat-cell *matCellDef="let record"><a [routerLink]="['/ui','endpoints', api.name, 'groups', record.group]">{{record.group}}</a></mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="columnNames"></mat-header-row>
    <mat-row *matRowDef="let row; columns: columnNames"></mat-row>
  </mat-table>
  <mat-paginator
    #paginator
    [length]="recordCount | async"
    [pageSize]="pageSize"
    [hidePageSize]="true"
    [showFirstLastButtons]="true">
  </mat-paginator>
`
})
export class EndpointGroupListComponent extends BaseListComponent<Group> implements OnInit {
  api: Api;

  constructor(
    injector: Injector,
  ) {
    super(injector, null, 'Endpoint Groups - Gateway Admin');
    this.columnNames = ['group'];
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: {api: Api}) => {
        this.api = data.api;
        const endpoint = this.api.plugin('acl');
        if (endpoint) {
          const groupNames = endpoint.config.whitelist;
          if (groupNames) {
            const records = [];
            for (const groupName of groupNames) {
              records.push({group: groupName});
            }
            this.arrayDataSource.data = records;
          }
        }
      }
      );
  }
}
