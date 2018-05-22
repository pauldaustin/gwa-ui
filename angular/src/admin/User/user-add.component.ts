import { Component } from '@angular/core';

@Component({
  selector: 'app-user-add',
  template: `
<mat-tab-group>
  <mat-tab label="Add User">
    <app-user-view addPage="true"></app-user-view>
  </mat-tab>
</mat-tab-group>
  `
})
export class UserAddComponent {
}
