import {
  Component,
  Injector,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../../shared/Component/BaseListComponent';

import { Api } from './Api';
import { ApiService } from './ApiService';

@Component({
  selector: 'app-api-list',
  templateUrl: 'ApiList.html'
})
export class ApiListComponent extends BaseListComponent<Api> implements OnInit {

  @ViewChild('upstreamT') upstreamTemplate: TemplateRef<any>;

  constructor(
    injector: Injector,
    protected apiService: ApiService
  ) {
    super(injector, apiService, 'APIs - Gateway Admin');
    this.filterFields = [
      { prop: 'name', name: 'Name' },
      { prop: 'hosts', name: 'Host' },
      { prop: 'uris', name: 'Path' },
    ];
    this.filterFieldName = 'name';
  }

  ngOnInit(): void {
    this.x = y;
    this.columns = [
      { name: 'Name', cellTemplate: this.idTemplate, sortable: true },
      { prop: 'hosts', name: 'Hosts', cellTemplate: this.arrayTemplate, sortable: true },
      { prop: 'uris', name: 'Paths', cellTemplate: this.arrayTemplate, sortable: true },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: true },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }
}
