import { Component } from '@angular/core';

@Component({
  selector: 'api-add',
  template: `
<md-tab-group>
  <md-tab label="Add API">
    <api-view addPage="true"></api-view>
  </md-tab>
</md-tab-group>
  `
})
export class ApiAddComponent  {
}
