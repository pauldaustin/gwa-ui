import {
  Component,
  Injector,
  OnInit
} from '@angular/core';

import { BaseListComponent } from '../../../shared/Component/BaseListComponent';

import { Api } from '../../Api/Api';
import { Group } from '../../Group/Group';

@Component({
  selector: 'app-endpoint-group-list',
  template: `
<ngx-datatable
  class="material striped"
  [rows]="rows"
  [columns]="columns"
  [columnMode]="'force'"
  [headerHeight]="30"
  [footerHeight]="30"
  [rowHeight]="30"
  [cssClasses]="cssClasses"
  [scrollbarV]="true"
>
</ngx-datatable>

<ng-template #idT let-row="row" let-value="value">
  <a [routerLink]="['/ui','endpoints', api.name, 'groups', value]">{{value}}</a>
</ng-template>
`
})
export class EndpointGroupListComponent extends BaseListComponent<Group> implements OnInit {
  api: Api;

  constructor(
    injector: Injector,
  ) {
    super(injector, null, 'Endpoint Groups - Gateway Admin');
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: { api: Api }) => {
        this.api = data.api;
        const endpoint = this.api.plugin('acl');
        if (endpoint) {
          const groupNames = endpoint.config.whitelist;
          if (groupNames) {
            for (const groupName of groupNames) {
              this.rows.push({ group: groupName });
            }
          }
        }
      }
      );
    this.columns = [
      { prop: 'group', name: 'Group', cellTemplate: this.idTemplate, sortable: true },
    ];
  }
}
