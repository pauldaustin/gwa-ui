import {
  Component,
  Inject
} from '@angular/core';
import {
  MdDialog, 
  MdDialogRef,
  MD_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'message-dialog',
  template: `
<h1 md-dialog-title>{{title}}</h1>
<div md-dialog-content>{{message}}</div>
<div md-dialog-actions>
  <button md-raised-button md-dialog-close color="primary">Close</button>
</div>
  `,
})
export class MessageDialog {
  title : string = this.data['title'];
  
  message : string = this.data['message'];
  
  constructor(
    public dialogRef : MdDialogRef<MessageDialog>,
    @Inject(MD_DIALOG_DATA) public data: any,
   ) {
  }
}
