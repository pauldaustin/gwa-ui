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
  templateUrl: 'app/Plugin/PluginList.html'
})
export class ConsumerPluginListComponent extends PluginListComponent {
  consumer: Consumer;

  constructor(
    injector: Injector,
    service: PluginService
  ) {
    super(injector, service);
  }

  ngOnInit(): void {
    this.route.parent.data
      .subscribe((data: { consumer: Consumer }) => {
        this.consumer = data.consumer;
        this.filterFieldName = 'consumer_id';
        this.filterValue = data.consumer.id;
      }
    );
    super.ngOnInit();
  }
}