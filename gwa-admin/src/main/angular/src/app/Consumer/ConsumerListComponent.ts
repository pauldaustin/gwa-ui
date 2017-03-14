import { 
  Component, 
  Injector
} from '@angular/core';

import { BaseListComponent } from '../Component/BaseListComponent';

import { Consumer } from './Consumer';
import { ConsumerService } from './ConsumerService';

@Component({
  selector: 'consumer-list',
  templateUrl: 'app/Consumer/ConsumerList.html'
})
export class ConsumerListComponent extends BaseListComponent<Consumer> {

  constructor(
    injector: Injector,
    service: ConsumerService
  ) {
    super(injector, service);
    this.paging = true;
    this.filterFields = [
      { prop: "username", name: "Username"},
      { prop: "custom_id", name: "Custom ID"},
    ];
    this.filterFieldName = "username";
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'username', name: 'Username', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'custom_id', name: 'Custom Id', cellTemplate: this.idTemplate, sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  } 
}