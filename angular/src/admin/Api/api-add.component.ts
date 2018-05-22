import {Component} from '@angular/core';

@Component({
  selector: 'app-api-add',
  template: `
<mat-tab-group>
  <mat-tab label="Add API">
    <app-api-view addPage="true"></app-api-view>
  </mat-tab>
</mat-tab-group>
  `
})
export class ApiAddComponent {
}
