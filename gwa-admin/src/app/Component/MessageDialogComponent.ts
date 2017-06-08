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
  selector: 'app-message-dialog',
  template: `
<h1 md-dialog-title>{{title}}</h1>
<div md-dialog-content>{{message}}</div>
<div md-dialog-actions>
  <button md-raised-button md-dialog-close color="primary">Close</button>
</div>
  `,
})
export class MessageDialogComponent {
  title: string = this.data['title'];

  message: string = this.data['message'];

  constructor(
    public dialogRef: MdDialogRef<MessageDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
  }
}
