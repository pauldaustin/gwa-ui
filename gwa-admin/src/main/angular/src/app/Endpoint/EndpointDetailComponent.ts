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
  templateUrl: 'app/Endpoint/EndpointDetail.html'
})
export class EndpointDetailComponent extends BaseDetailComponent<Api> {
  endPoint : Plugin;

  rateLimit : Plugin;
 
  constructor(
    protected injector:Injector,
    public endPointService: EndpointService
  ) {
    super(injector, endPointService);
    this.idParamName = 'name';
  }
  
  get endPointUriTemplates() : string[] {
    return this.endPointService.endPointUriTemplates;
  }

  protected setObject(object : Api) {
    this.endPoint = object.plugin('bcgov-gwa-endpoint');
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
      this.endPoint.config['uri_template'],
      this.object.name
    );
  }

}
