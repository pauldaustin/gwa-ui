import {
  Component, 
  Injector
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Endpoint } from './Endpoint';
import { EndpointService } from './EndpointService';

@Component({
  selector: 'endpoint-detail',
  templateUrl: 'app/Endpoint/EndpointDetail.html'
})
export class EndpointDetailComponent extends BaseDetailComponent<Endpoint> {
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
}
