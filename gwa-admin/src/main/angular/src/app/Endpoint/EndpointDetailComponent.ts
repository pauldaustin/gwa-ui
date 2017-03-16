import {
  Component, 
  Injector
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Api } from '../Api/Api';
import { EndpointService } from './EndpointService';

@Component({
  selector: 'endpoint-detail',
  templateUrl: 'app/Endpoint/EndpointDetail.html'
})
export class EndpointDetailComponent extends BaseDetailComponent<Api> {
  endPoint : Plugin;
  
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
    super.setObject(object);
    this.endPoint = object.plugin('bcgov-gwa-endpoint');
  }

}
