import {Component} from '@angular/core';

@Component({
  selector: 'admin-api-add',
  template: `
<mat-tab-group>
  <mat-tab label="Add API">
    <admin-api-view addPage="true"></admin-api-view>
  </mat-tab>
</mat-tab-group>
  `
})
export class ApiAddComponent {
}
