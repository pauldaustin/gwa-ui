import { 
  Component, 
  Injector
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Api } from './Api';
import { ApiService } from './ApiService';

@Component({
  moduleId: module.id,
  selector: 'api-list',
  templateUrl: 'ApiListComponent.html'
})
export class ApiListComponent extends BaseListComponent<Api> {

  constructor(
    injector: Injector,
    protected apiService: ApiService
  ) {
    super(injector, apiService);
  }
  
  ngOnInit(): void {
    this.apiService.getApis().then(apis => this.objects = apis);
  }
}