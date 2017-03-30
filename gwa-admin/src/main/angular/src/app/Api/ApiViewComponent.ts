import {
  Component, 
  Injector,
  Input
} from '@angular/core';

import { BaseDetailComponent } from '../Component/BaseDetailComponent';

import { Api } from './Api';
import { Plugin } from '../Plugin/Plugin';
import { ApiService } from './ApiService';

@Component({
  selector: 'api-view',
  templateUrl: 'ApiView.html'
})
export class ApiViewComponent extends BaseDetailComponent<Api> {
  endpoint : Plugin;

  constructor(
    protected injector:Injector,
    protected service: ApiService
  ) {
    super(injector, service);
    this.idParamName = 'apiName';
  }

  ngOnInit() {
    if (this.addPage) {
      super.ngOnInit();
    } else {
      this.route.parent.data
        .subscribe((data: { api: Api }) => {
          const api = data.api;
          if (api) {
            let endpoint = api.plugin('bcgov-gwa-endpoint');
            if (endpoint == null) {
              endpoint = new Plugin();
              endpoint.name = 'bcgov-gwa-endpoint';
              endpoint.config = {
                api_owners: [''],
                allow_developer_keys: false
              }
              api.pluginAdd(endpoint);
            }
            this.endpoint = endpoint;
          }

          this.setObject(data.api);
        }
      );
    }
  }
}
