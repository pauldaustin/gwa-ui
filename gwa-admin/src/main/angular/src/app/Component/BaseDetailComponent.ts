import 'rxjs/add/operator/toPromise';
import {
  Injector,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { Params } from '@angular/router';
import { BaseComponent } from './BaseComponent';
import { Service } from '../Service/Service';

export class BaseDetailComponent<T> extends BaseComponent<T> {
  @Input()
  addPage : boolean = false;

  form : FormGroup;

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
      .subscribe(object => this.setObject(object));
  }

  protected setObject(object : T) {
    this.object = object;
  }
  
  postSave(savedObject: T): void {
  }

  protected saveDo(): Promise<T> {
    return this.service.addOrUpdateObject(this.object);
  }

  protected saveValues(object : any, form : AbstractControl) {
    for (const key in form.value) {
      const value = form.value[key];
      object[key] = value;
    }
  }

  save(close : boolean = true): void {
   this.saveDo()
     .then((savedObject) => {
       if (savedObject != null) {
         this.postSave(savedObject);
         if (close) {
           this.routeList();
         }
       }
     });
  }
  
}