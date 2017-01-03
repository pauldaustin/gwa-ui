import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EndPoint } from './EndPoint';
import { EndPointService } from './EndPointService';

@Component({
  moduleId: module.id,
  selector: 'endPoint-list',
  templateUrl: 'EndPointListComponent.html',
  styleUrls: [ 'EndPointListComponent.css' ]
})
export class EndPointListComponent implements OnInit {
  endPoints: EndPoint[];
  selectedEndPoint: EndPoint;

  constructor(
    private router: Router,
    private endPointService: EndPointService) { }

  getEndPoints(): void {
    this.endPointService.getEndPoints().then(endPoints => this.endPoints = endPoints);
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