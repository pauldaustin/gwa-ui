import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Consumer } from './Consumer';

@Injectable()
export class ConsumerService extends BaseService<Consumer> {
  constructor(injector:Injector) {
    super(injector, '/consumers');
  }

  deleteObject(consumer: Consumer): Promise<boolean> {
    return this.deleteObjectDo(
      `/consumers/${consumer.id}`
    );
  }

  updateObject(consumer: Consumer): Promise<Consumer> {
    return this.updateObjectDo(
      `/consumers/${consumer.id}`,
      consumer
    );
  }

  newObject(): Consumer {
    return new Consumer();
  }
}
