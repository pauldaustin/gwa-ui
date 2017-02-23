import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Consumer }         from './Consumer';
import { ConsumerService }  from './ConsumerService';

@Component({
  moduleId: module.id,
  selector: 'consumer-detail',
  templateUrl: 'Detail.html'
})
export class ConsumerDetailComponent implements OnInit {
  consumer: Consumer;

  constructor(
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.consumerService.getConsumer(params['id']))
      .subscribe(consumer => this.consumer = consumer);
  }

  goBack(): void {
    this.router.navigate(['/consumers']);
  }
  
  save(): void {
    this.consumerService.updateObject(this.consumer)
      .then(() => this.goBack());
  }
}
