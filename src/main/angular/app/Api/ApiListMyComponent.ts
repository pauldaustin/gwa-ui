import { 
  Component, 
  Injector
} from '@angular/core';

import { ApiListComponent } from './ApiListComponent';
import { ApiService } from './ApiService';

@Component({
  moduleId: module.id,
  selector: 'api-list',
  templateUrl: 'ApiListComponent.html'
})
export class ApiListMyComponent extends ApiListComponent {
  constructor(injector: Injector, apiService: ApiService) {
    super(injector, apiService);
  }
 
  ngOnInit(): void {
    this.apiService.getMyApis().then(apis => this.objects = apis);
  }
}