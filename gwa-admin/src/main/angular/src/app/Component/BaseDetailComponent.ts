import 'rxjs/add/operator/toPromise';
import {
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  FormBuilder
} from '@angular/forms';
import { Params } from '@angular/router';
import { BaseComponent } from './BaseComponent';
import { Service } from '../Service/Service';

export class BaseDetailComponent<T> extends BaseComponent<T> {
  id: string;
  
  idParamName : string = "id";
  
  object: T;

  protected formBuilder: FormBuilder = this.injector.get(FormBuilder);

  constructor(injector: Injector, service : Service<T>) {
    super(injector, service);
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.id = params[this.idParamName];
        if (this.id) {
          return this.service.getObject(this.id);
        } else {
          const object = this.service.newObject();
          return Promise.resolve(object);
        }
      })
      .subscribe(object => this.object = object);
  }

  postSave(savedObject: T): void {
    this.goBack();
  }

  saveDo(): Promise<T> {
    if (this.id) {
      return this.service.updateObject(this.object);
    } else {
      return this.service.addObject(this.object);
    }
  }

  save(): void {
   this.saveDo()
     .then((savedObject) => {
       this.postSave(savedObject);
     });
  }
  
}