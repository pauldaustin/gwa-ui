import {Component} from '@angular/core';

@Component({
  selector: 'app-api-plugin-add',
  template: `
<md-tab-group>
  <md-tab label="Add Plugin">
    <app-api-plugin-view addPage="true"></app-api-plugin-view>
  </md-tab>
</md-tab-group>
  `
})
export class ApiPluginAddComponent {
}
