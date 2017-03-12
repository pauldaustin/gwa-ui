import { Component } from '@angular/core';
import {
  MdDialog, 
  MdDialogRef 
} from '@angular/material';

@Component({
  selector: 'message-dialog',
  template: `
<h1 md-dialog-title>{{title}}?</h1>
<div md-dialog-content>{{message}}</div>
<div md-dialog-actions>
  <button md-button md-dialog-close>Close</button>
</div>
  `,
})
export class MessageDialog {
  title : string = this.dialogRef.config.data['title'];
  
  message : string = this.dialogRef.config.data['message'];
  
  constructor(
    public dialogRef : MdDialogRef<MessageDialog>,
   ) {
  }
}
