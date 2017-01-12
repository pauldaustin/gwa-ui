import 'rxjs/add/operator/switchMap';
import {
  Component,
  Input
}            from '@angular/core';

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
    private endPointService: EndPointService
  ) {}
 
  goBack(): void {
    this.addEndPointModal.hide();
  }

  save(): void {
   // this.endPointService.update(this.endPoint)
    //  .then(() => this.goBack());
  }
}
