import { Component } from '@angular/core';

@Component({
  selector: 'app-api-add',
  template: `
<md-tab-group>
  <md-tab label="Add API">
    <app-api-view addPage="true"></app-api-view>
  </md-tab>
</md-tab-group>
  `
})
export class ApiAddComponent {
}
