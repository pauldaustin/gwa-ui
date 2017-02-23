import {
  Injectable,
  Injector
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { BaseService } from '../Service/BaseService';

import { Consumer } from './Consumer';

@Injectable()
export class ConsumerService extends BaseService<Consumer> {
  constructor(injector:Injector) {
    super(injector);
  }

  addObject(consumer: Consumer): Promise<Consumer> {
    return this.addObjectDo(
      '/consumers',
      consumer
    );
  }

  deleteObject(consumer: Consumer): Promise<boolean> {
    return this.deleteObjectDo(
      `/consumers/${consumer.id}`
    );
  }

  getConsumer(id: string): Promise<Consumer> {
    const url = this.getUrl(`/consumers/${id}`);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toObject(data);
      })
      .catch(this.handleError);
  }

  getObjects(): Promise<Consumer[]> {
    return this.getObjectsDo('/consumers');
  }

  getRowsPage(offset: number, limit: number): Promise<any> {
    return this.getRowsPageDo('/consumers', offset, limit);
  }

  updateObject(Consumer: Consumer): Promise<Consumer> {
    return this.updateObjectDo(
      `/consumers/${Consumer.id}`,
      Consumer
    );
  }

  newObject(): Consumer {
    return new Consumer();
  }
}
