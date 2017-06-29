import {
  Component,
  Injector
} from '@angular/core';

import { ApiListComponent } from '../Api/ApiListComponent';
import { ApiService } from '../Api/ApiService';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: 'EndpointList.html'
})
export class EndpointListComponent extends ApiListComponent {

  constructor(
    injector: Injector,
    protected apiService: ApiService
  ) {
    super(injector, apiService);
    this.path = '/endpoints';
  }
}
