import 'rxjs/add/operator/switchMap';

import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Consumer }         from './Consumer';
import { ConsumerService }  from './ConsumerService';

@Component({
  selector: 'consumer-create',
  templateUrl: 'Detail.html'
})
export class ConsumerCreateComponent {
  consumer: Consumer = new Consumer();
   
  constructor(
    private router: Router,
    private consumerService: ConsumerService
  ) {
  }

  goBack(): void {
    this.router.navigate(['/consumers']);
  }
  
  save(): void {
    this.consumerService.addObject(this.consumer)
      .then((consumer) => this.goBack());
  }
}
