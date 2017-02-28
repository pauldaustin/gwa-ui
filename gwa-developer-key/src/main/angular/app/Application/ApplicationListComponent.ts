import {
  Component,
  Injector,
  Input 
} from '@angular/core';

import { BaseListComponent }  from '../Component/BaseListComponent';

import { Application } from './Application';
import { ApplicationService }  from './ApplicationService';

@Component({
  moduleId: module.id,
  selector: 'application-list',
  templateUrl: 'ApplicationList.html'
})
export class ApplicationListComponent extends BaseListComponent<Application>{
  constructor(
     injector: Injector,
     service: ApplicationService
  ) {
    super(injector, service);
    this.paging = true;
  }

  ngOnInit(): void {
    this.columns = [
      { prop: 'group', name: 'Name', sortable: false },
      { prop: 'created_at', name: 'Created At', cellTemplate: this.dateTemplate, sortable: false },
      { name: 'Actions', cellTemplate: this.actionsTemplate, sortable: false }
    ];
    super.ngOnInit();
  }

  addApplication(): void {
    let application: Application = new Application();
    this.service.addObject(
      application
    ).then(
      application => this.refresh()
    );
  }

}
