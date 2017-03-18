import {
  Component, 
  Injector,
  Input
} from '@angular/core';

import { BaseDetailComponent } from '../Component/BaseDetailComponent';

import { Api } from './Api';
import { ApiService } from './ApiService';

@Component({
  selector: 'api-view',
  templateUrl: 'app/Api/ApiView.html'
})
export class ApiViewComponent extends BaseDetailComponent<Api> {
  constructor(
    protected injector:Injector,
    protected service: ApiService
  ) {
    super(injector, service);
    this.idParamName = 'apiName';
  }

  ngOnInit() {
    if (this.addPage) {
      super.ngOnInit();
    } else {
      this.route.parent.data
        .subscribe((data: { api: Api }) => {
          this.setObject(data.api);
        }
      );
    }
  }
}
