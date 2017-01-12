import 'rxjs/add/operator/switchMap';

import {
  Component,
  Input
} from '@angular/core';

import { Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { EndPoint }         from './EndPoint';
import { EndPointService }  from './EndPointService';

@Component({
  moduleId: module.id,
  selector: 'endpoint-create',
  templateUrl: 'EndPointDetailComponent.html'
})
export class EndPointCreateComponent {
  endPoint: EndPoint = new EndPoint();
  
  @Input() addEndPointModal: ModalDirective;
   
  constructor(
    private router: Router,
    private endPointService: EndPointService
  ) {}
 
  goBack(): void {
    this.addEndPointModal.hide();
  }

  save(): void {
   this.endPointService.create(this.endPoint)
     .then((data) => {
       const endPointId = data.id;
       this.addEndPointModal.hide();
       this.router.navigate(['/endPoints', endPointId]);
     });
  }
}
