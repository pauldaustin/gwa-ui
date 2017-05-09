import { Component } from '@angular/core';

@Component({
  selector: 'user-add',
  template: `
<md-tab-group>
  <md-tab label="Add User">
    <user-view addPage="true"></user-view>
  </md-tab>
</md-tab-group>
  `
})
export class UserAddComponent  {
}
