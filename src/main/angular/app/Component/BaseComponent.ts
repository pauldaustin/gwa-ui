import { 
  Injector, 
  OnInit 
} from '@angular/core';

import {Router } from '@angular/router';

import { Service } from '../Service/Service';

export class BaseComponent<T> implements OnInit {
  protected router: Router = this.injector.get(Router);
  constructor(
    protected injector:Injector,
    protected service: Service<T>
  ) {
  }
    
  ngOnInit(): void {
  }
}