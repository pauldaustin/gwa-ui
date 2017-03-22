import {
  Component, 
  Injector
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Api } from '../Api/Api';
import { EndpointService } from './EndpointService';
import { Plugin } from '../Plugin/Plugin';

@Component({
  selector: 'endpoint-detail',
  templateUrl: 'EndpointDetail.html'
})
export class EndpointDetailComponent extends BaseDetailComponent<Api> {
  endpoint : Plugin;

  rateLimit : Plugin;
 
  constructor(
    protected injector:Injector,
    public endpointService: EndpointService
  ) {
    super(injector, endpointService);
    this.idParamName = 'name';
  }

  protected setObject(object : Api) {
    this.endpoint = object.plugin('bcgov-gwa-endpoint');
    let rateLimit = object.plugin('rate-limiting');
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
      }
      object.pluginAdd(rateLimit);
    }
    this.rateLimit = rateLimit;
    super.setObject(object);
  }

  endpointUri() : string {
    return Api.uri(
      this.endpoint.config['uri_template'],
      this.object.name
    );
  }

}
