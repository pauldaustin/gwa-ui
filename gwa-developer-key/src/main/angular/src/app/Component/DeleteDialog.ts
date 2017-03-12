import { Component } from '@angular/core';
import {
  MdDialog, 
  MdDialogRef 
} from '@angular/material';

@Component({
  selector: 'delete-dialog',
  template: `
<h1 md-dialog-title>Delete {{typeTitle}}?</h1>
<div md-dialog-content>
  <p>Are you sure you want to delete {{typeTitle}}:</p>
  <p><b>{{objectLabel}}</b>?</p>
</div>
<div md-dialog-actions>
  <button md-button (click)="dialogRef.close('Cancel')">Cancel</button>
  <button md-button (click)="dialogRef.close('Delete')" color="alert">Delete</button>
</div>
  `,
})
export class DeleteDialog {
  typeTitle : string = this.dialogRef.config.data['typeTitle'];
  
  objectLabel : string = this.dialogRef.config.data['objectLabel'];
  
  constructor(
    public dialogRef : MdDialogRef<DeleteDialog>,
   ) {
  }
}