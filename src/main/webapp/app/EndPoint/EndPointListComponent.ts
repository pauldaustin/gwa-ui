import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EndPoint } from './EndPoint';
import { EndPointService } from './EndPointService';

@Component({
  moduleId: module.id,
  selector: 'endPoint-list',
  templateUrl: 'EndPointListComponent.html'
})
export class EndPointListComponent implements OnInit {
  endPoints: EndPoint[];
  selectedEndPoint: EndPoint;

  constructor(
    protected router: Router,
    protected endPointService: EndPointService) { }

  getEndPoints(): void {
    this.endPointService.getEndPoints().then(endPoints => this.endPoints = endPoints);
  }

  delete(endPoint: EndPoint): void {
    this.endPointService
      .delete(endPoint.id)
      .then(() => {
        this.endPoints = this.endPoints.filter(e => e !== endPoint);
        if (this.selectedEndPoint === endPoint) {
          this.selectedEndPoint = null;
        }
      });
  }
  
  ngOnInit(): void {
    this.getEndPoints();
  }

  onSelect(endPoint: EndPoint): void {
    this.selectedEndPoint = endPoint;
  }

  gotoDetail(): void {
    this.router.navigate(['/endPoints', this.selectedEndPoint.id]);
  }
  
  
}