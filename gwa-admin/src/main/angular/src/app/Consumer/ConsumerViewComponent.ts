import {
  Component, 
  Injector
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Consumer }         from './Consumer';
import { ConsumerService }  from './ConsumerService';

@Component({
  selector: 'consumer-view',
  templateUrl: 'app/Consumer/ConsumerView.html'
})
export class ConsumerViewComponent extends BaseDetailComponent<Consumer> {
  constructor(
    protected injector:Injector,
    protected service: ConsumerService
  ) {
    super(injector, service);
  }

  ngOnInit() {
    if (this.addPage) {
      super.ngOnInit();
    } else {
      this.route.parent.data
        .subscribe((data: { consumer: Consumer }) => {
          this.setObject(data.consumer);
        }
      );
    }
  }

}
