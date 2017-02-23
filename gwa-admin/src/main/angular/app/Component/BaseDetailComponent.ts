import {
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { BaseComponent } from './BaseComponent';

import { Service } from '../Service/Service';

export class BaseDetailComponent<T> extends BaseComponent<T> {
  id: string;
  
  object: T;

  constructor(injector: Injector, service : Service<T>) {
    super(injector, service);
  }

  ngOnInit() {
    this.service.getObject(this.id).then(
      object => this.object = object
    );
  }

}