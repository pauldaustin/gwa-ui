import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EndPoint } from './EndPoint';
import { EndPointListComponent } from './EndPointListComponent';
import { EndPointService } from './EndPointService';

@Component({
  moduleId: module.id,
  selector: 'endPoint-list',
  templateUrl: 'EndPointListComponent.html'
})
export class EndPointListMyComponent extends EndPointListComponent {
  constructor(router: Router, endPointService: EndPointService) {
    super(router, endPointService);
  }

  getEndPoints(): void {
    this.endPointService.getMyEndPoints().then(endPoints => this.endPoints = endPoints);
  }
}