import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Api } from '../Api/Api';
import { EndpointService } from './EndpointService';
import { Plugin } from '../Plugin/Plugin';

@Component({
  selector: 'endpoint-view',
  templateUrl: 'EndpointView.html'
})
export class EndpointViewComponent extends BaseDetailComponent<Api> implements OnInit {

  acl: Plugin;

  endpoint: Plugin;

  keyAuth: Plugin;

  rateLimit: Plugin;

  constructor(
    protected injector: Injector,
    protected endpointService: EndpointService
  ) {
    super(injector, endpointService);
    this.idParamName = 'apiName';
  }

  ngOnInit() {
    this.route.parent.data
      .subscribe((data: { api: Api }) => {
        const api = data.api;
        if (api) {
          this.endpoint = api.plugin('bcgov-gwa-endpoint');
          this.acl = api.plugin('acl');
          this.keyAuth = api.plugin('key-auth');
          let rateLimit = api.plugin('rate-limiting');
          if (rateLimit == null) {
            rateLimit = new Plugin();
            rateLimit.name = 'rate-limiting';
            rateLimit.config = {
              second: null,
              minute: 60,
              hour: null,
              day: null,
              month: null,
              year: null
            };
            api.pluginAdd(rateLimit);
          }
          this.rateLimit = rateLimit;
        }
        this.setObject(api);
      }
      );
  }
}
