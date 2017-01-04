import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { EndPoint }         from './EndPoint';
import { EndPointService }  from './EndPointService';
@Component({
  moduleId: module.id,
  selector: 'endpoint-detail',
  templateUrl: 'EndPointDetailComponent.html',
  styleUrls: [ 'EndPointDetailComponent.css' ]
})
export class EndPointDetailComponent implements OnInit {
  endPoint: EndPoint;

  constructor(
    private endPointService: EndPointService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.endPointService.getEndPoint(params['id']))
      .subscribe(endPoint => this.endPoint = endPoint);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.endPointService.update(this.endPoint)
      .then(() => this.goBack());
  }
}
