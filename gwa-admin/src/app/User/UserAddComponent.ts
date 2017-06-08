import { Component } from '@angular/core';

@Component({
  selector: 'app-user-add',
  template: `
<md-tab-group>
  <md-tab label="Add User">
    <app-user-view addPage="true"></app-user-view>
  </md-tab>
</md-tab-group>
  `
})
export class UserAddComponent {
}
