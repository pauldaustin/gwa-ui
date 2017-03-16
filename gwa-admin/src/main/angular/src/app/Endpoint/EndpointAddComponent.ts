import {
  Component, 
  Injector
} from '@angular/core';
import { Api } from '../Api/Api';
import { EndpointService } from './EndpointService';
import { EndpointDetailComponent } from './EndpointDetailComponent';

@Component({
  selector: 'endpoint-add',
  templateUrl: 'app/Endpoint/EndpointDetail.html'
})
export class EndpointAddComponent extends EndpointDetailComponent {

  constructor(
    protected injector:Injector,
    protected service: EndpointService
  ) {
    super(injector, service);
  }

  postSave(savedEndpoint: Api): void {
    this.router.navigate(['/ui/endpoints', savedEndpoint.name]);
  }

}
