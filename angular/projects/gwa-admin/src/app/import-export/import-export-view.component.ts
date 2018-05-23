import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import {ImportExport} from './import-export';

@Component({
  selector: 'admin-import-export-view',
  templateUrl: './import-export-view.component.html',
})
export class ImportExportViewComponent {
  row: ImportExport = this.data['row'];

  fieldNames: string = this.data['fieldNames'];

  constructor(
    public dialogRef: MatDialogRef<ImportExportViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
}
