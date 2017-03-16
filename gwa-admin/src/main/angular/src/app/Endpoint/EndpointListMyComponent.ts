import { 
  Component, 
  Injector
} from '@angular/core';

import { EndpointListComponent } from './EndpointListComponent';
import { EndpointService } from './EndpointService';

@Component({
  selector: 'endpoint-my-list',
  templateUrl: 'app/Endpoint/EndpointList.html'
})
export class EndpointListMyComponent extends EndpointListComponent {
  constructor(injector: Injector, endpointService: EndpointService) {
    super(injector, endpointService);
    this.paging = false;
  }
 
  refresh(): void {
    this.endpointService.getMyEndpoints().then(endpoints => this.rows = endpoints);
  }
}