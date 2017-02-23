import 'rxjs/add/operator/switchMap';

import {
  Component,
  Input
} from '@angular/core';

import { Router } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { Api }         from './Api';
import { ApiService }  from './ApiService';

@Component({
  moduleId: module.id,
  selector: 'api-create',
  templateUrl: 'Detail.html'
})
export class ApiCreateComponent {
  api: Api = new Api();
  
  @Input() addApiModal: ModalDirective;
   
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
 
  goBack(): void {
    this.addApiModal.hide();
  }

  save(): void {
   this.apiService.addObject(this.api)
     .then((api) => {
       this.addApiModal.hide();
       this.router.navigate(['/apis', api.id]);
     });
  }
}
