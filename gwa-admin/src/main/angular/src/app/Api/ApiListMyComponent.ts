import { 
  Component, 
  Injector
} from '@angular/core';

import { ApiListComponent } from './ApiListComponent';
import { ApiService } from './ApiService';

@Component({
  selector: 'api-list',
  templateUrl: 'List.html'
})
export class ApiListMyComponent extends ApiListComponent {
  constructor(injector: Injector, apiService: ApiService) {
    super(injector, apiService);
  }
 
  refresh(): void {
    this.apiService.getMyApis().then(apis => this.rows = apis);
  }
}