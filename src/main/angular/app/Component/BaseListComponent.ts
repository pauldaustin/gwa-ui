import { Injector } from '@angular/core';

import { BaseComponent } from './BaseComponent';

import { Service } from '../Service/Service';

export class BaseListComponent<T> extends BaseComponent<T> {
  
  protected objects: Array<T> = [];
  
  constructor(injector: Injector, service : Service<T>) {
    super(injector, service);
  }

  deleteObject(object: T): void {
    this.service.deleteObject(object)
      .then((deleted) => {
        if (deleted) {
          this.onDeleted(object);
        }
      })
    ;
  }

  onDeleted(object: T): void {
    this.objects = this.objects.filter(value => value !== object);
  }

  getObjects() : Array<T> {
   return this.objects;
  }
}