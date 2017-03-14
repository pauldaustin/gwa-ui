import {
  Component, 
  Injector
} from '@angular/core';
import { Consumer } from './Consumer';
import { ConsumerService } from './ConsumerService';
import { ConsumerDetailComponent } from './ConsumerDetailComponent';

@Component({
  selector: 'consumer-add',
  templateUrl: 'app/Consumer/ConsumerDetail.html'
})
export class ConsumerAddComponent extends ConsumerDetailComponent {

  constructor(
    protected injector:Injector,
    protected service: ConsumerService
  ) {
    super(injector, service);
  }

  postSave(savedConsumer: Consumer): void {
    this.router.navigate(['/ui/consumers', savedConsumer.username]);
  }

}
