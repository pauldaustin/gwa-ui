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
<div md-dialog-content>
<p>{{message}}<p>
<pre>{{body}}</pre>
</div>
<div md-dialog-actions>
  <button md-raised-button (click)="dialogRef.close()" color="primary">Close</button>
</div>
  `,
})
export class MessageDialogComponent {
  title: string = this.data['title'];

  message: string = this.data['message'];

  body: string = this.data['body'];

  constructor(
    public dialogRef: MdDialogRef<MessageDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
  }
}
