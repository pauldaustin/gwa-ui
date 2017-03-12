import {
  Component, 
  Injector
} from '@angular/core';
import { BaseDetailComponent } from '../Component/BaseDetailComponent';
import { Consumer }         from './Consumer';
import { ConsumerService }  from './ConsumerService';

@Component({
  selector: 'consumer-detail',
  templateUrl: 'ConsumerDetail.html'
})
export class ConsumerDetailComponent extends BaseDetailComponent<Consumer> {
  constructor(
    protected injector:Injector,
    protected service: ConsumerService
  ) {
    super(injector, service);
    this.idParamName = 'username';
  }
}
