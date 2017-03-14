import { 
  Component, 
  Injector
} from '@angular/core';

import { ApiListComponent } from './ApiListComponent';
import { ApiService } from './ApiService';

@Component({
  selector: 'api-my-list',
  templateUrl: 'app/Api/ApiList.html'
})
export class ApiListMyComponent extends ApiListComponent {
  constructor(injector: Injector, apiService: ApiService) {
    super(injector, apiService);
    this.paging = false;
  }
 
  refresh(): void {
    this.apiService.getMyApis().then(apis => this.rows = apis);
  }
}