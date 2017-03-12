import { 
  Component, 
  Injector
} from '@angular/core';
import { Params } from '@angular/router';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { StatusService } from './StatusService';

@Component({
  selector: 'status-detail',
  template: `
<div class="row">
  <div class="col-md-6">
    <h2>Server Status</h2>
    <ngx-datatable
      [columns]="columns"
      [rows]="serverRows"
      class="material striped"
      columnMode="force"
    >
    </ngx-datatable>
  </div>

  <div class="col-md-6">
    <h2>Database Status</h2>
    <ngx-datatable
      [columns]="columns"
      [rows]="databaseRows"
      class="material striped"
      columnMode="force"
    >
    </ngx-datatable>
  </div>
</div>
  `
})
export class StatusDetailComponent extends BaseDetailComponent<any> {

  columns = [
    { name : 'Name', sortable : false },
    { name : 'Value', sortable : false }
  ];

  constructor(
    injector: Injector,
    protected statusService: StatusService
  ) {
    super(injector, statusService);
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.statusService.getStatus();
      })
      .subscribe(object => this.object = object);
  }
  
  get serverRows(): any[] {
    let rows = new Array<any>();
    if (this.object) {
      for (let name in this.object.server) {
        rows.push({
          name: name,
          value: this.object.server[name]
        });
      }
    }
    return rows;
  }
  
  get databaseRows(): any[] {
    let rows = new Array<any>();
    if (this.object) {
      for (let name in this.object.database) {
        rows.push({
          name: name,
          value: this.object.database[name]
        });
      }
    }
    return rows;
  }
}