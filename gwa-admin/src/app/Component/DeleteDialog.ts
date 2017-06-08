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
  selector: 'delete-dialog',
  template: `
<h1 md-dialog-title>Delete {{typeTitle}}?</h1>
<div md-dialog-content>
  <p>Are you sure you want to delete {{typeTitle}}:</p>
  <p><b>{{objectLabel}}</b>?</p>
</div>
<div md-dialog-actions>
  <button md-raised-button (click)="dialogRef.close('Cancel')">Cancel</button>
  <button md-raised-button (click)="dialogRef.close('Delete')" color="warn" style="margin-left: 10px;">Delete</button>
</div>
  `,
})
export class DeleteDialog {
  typeTitle: string = this.data['typeTitle'];

  objectLabel: string = this.data['objectLabel'];

  constructor(
    public dialogRef: MdDialogRef<DeleteDialog>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
  }
}
