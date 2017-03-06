import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Api }         from './Api';
import { ApiService }  from './ApiService';

@Component({
  selector: 'api-detail',
  templateUrl: 'Detail.html'
})
export class ApiDetailComponent implements OnInit {
  api: Api;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.apiService.getApi(params['id']))
      .subscribe(api => this.api = api);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    this.apiService.updateObject(this.api)
      .then(() => this.goBack());
  }
}
