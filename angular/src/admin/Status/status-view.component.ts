import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {Params} from '@angular/router';
import {BaseDetailComponent} from '../../shared/Component/BaseDetailComponent';
import {StatusService} from './status.service';

@Component({
  selector: 'app-status-detail',
  template: `
    <h2>Server Status</h2>
    <ngx-datatable
      class="material striped"
      [rows]="serverRows"
      [columns]="serverColumns"
      [columnMode]="'force'"
      [headerHeight]="50"
      [footerHeight]="0"
      [rowHeight]="50">
    >
    </ngx-datatable>

    <h2>Database Status</h2>
    <ngx-datatable
      class="material striped"
      [columns]="databaseColumns"
      [rows]="databaseRows"
      [columnMode]="'force'"
      [headerHeight]="50"
      [footerHeight]="0"
      [rowHeight]="50">
    >
    </ngx-datatable>
  `
})
export class StatusViewComponent extends BaseDetailComponent<any> implements OnInit {

  serverColumns = [
    {prop: 'name', sortable: false},
    {prop: 'text', sortable: false}
  ];

  databaseColumns = [
    {prop: 'name', sortable: false},
    {prop: 'text', sortable: false}
  ];

  constructor(
    injector: Injector,
    protected statusService: StatusService
  ) {
    super(injector, statusService, 'Status - Gateway Admin');
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        return this.statusService.getStatus();
      })
      .subscribe(object => this.object = object);
  }

  get serverRows(): any[] {
    const rows = new Array<any>();
    if (this.object) {
      for (const name of Object.keys(this.object.server)) {
        rows.push({
          name: name,
          text: this.object.server[name].toString()
        });
      }
    }
    return rows;
  }

  get databaseRows(): any[] {
    const rows = new Array<any>();
    if (this.object) {
      for (const name of Object.keys(this.object.database)) {
        rows.push({
          name: name,
          text: this.object.database[name].toString()
        });
      }
    }
    return rows;
  }
}
