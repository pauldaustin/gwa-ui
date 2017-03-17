import { Component } from '@angular/core';

@Component({
  selector: 'consumer-add',
  template: `
<md-tab-group>
  <md-tab label="Add Consumer">
    <consumer-view addPage="true"></consumer-view>
  </md-tab>
</md-tab-group>
  `
})
export class ConsumerAddComponent  {
}
