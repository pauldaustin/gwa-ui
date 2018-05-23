import { Component } from '@angular/core';

@Component({
  selector: 'admin-user-add',
  template: `
<mat-tab-group>
  <mat-tab label="Add User">
    <admin-user-view addPage="true"></admin-user-view>
  </mat-tab>
</mat-tab-group>
  `
})
export class UserAddComponent {
}
