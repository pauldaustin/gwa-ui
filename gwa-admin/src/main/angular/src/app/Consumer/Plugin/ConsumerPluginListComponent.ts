import { 
  Component, 
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseListComponent } from '../../Component/BaseListComponent';

import { Consumer } from '../Consumer';
import { PluginListComponent } from '../../Plugin/PluginListComponent';
import { PluginService } from '../../Plugin/PluginService';

@Component({
  selector: 'consumer-plugin-list',
  templateUrl: 'app/Consumer/Plugin/ConsumerPluginList.html'
})
export class ConsumerPluginListComponent extends PluginListComponent {
  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
    this.showConsumer = false;
    this.showPlugin = true;
  }

  initParams(): void {
    this.route.parent.data.subscribe((data: { consumer: Consumer }) => {
        const consumer = data.consumer;
        this.path = `/consumers/${consumer.id}/plugins`;
        this.refresh()
      }
    );
  }
}
