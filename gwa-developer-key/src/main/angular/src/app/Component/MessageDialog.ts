import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
 
@Component({  selector: 'confirm',
  template: `
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" (click)="close()" >&times;</button>
    <h4 class="modal-title">{{title}}</h4>
  </div>
  <div class="modal-body">
    <div *ngIf="alertType" class="alert alert-{{alertType}}" role="alert">{{message}}</div>
    <p *ngIf="!alertType">{{message}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" (click)="close()" >Close</button>
  </div>
</div>`
})
export class MessageDialog extends DialogComponent {
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
}