import { 
  Component,
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Api } from '../Api/Api';
import { EndpointService } from './EndpointService';

@Component({
  selector: 'endpoint-list',
  templateUrl: 'app/Endpoint/EndpointList.html'
})
export class EndpointListComponent extends BaseListComponent<Api> {

  @ViewChild('urlT') urlTemplate: TemplateRef<any>;

  @ViewChild('endpointUriT') endpointUriTemplate: TemplateRef<any>;

  constructor(
    injector: Injector,
    protected endpointService: EndpointService
  ) {
    super(injector, endpointService);
    this.paging = true;
    this.filterFields = [
      { prop: "name", name: "Name"},
      { prop: "upstream_url", name: "Upstream URL"},
    ];
    this.filterFieldName = "name";
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'config.name', name: 'Name', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'config', name: 'URI', cellTemplate: this.endpointUriTemplate, sortable: false },
      { prop: 'config.upstream_url', name: 'Upstream URL', cellTemplate: this.urlTemplate, sortable: false },
      { prop: 'config.created_by', name: 'Created By', sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  endpointUri(object : any) : string {
    return Api.uri(object['uri_template'], object['name']);
  }
}