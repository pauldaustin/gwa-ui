import {
  Component,
  Inject
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MD_DIALOG_DATA
} from '@angular/material';
import {ImportExport} from './import-export';

@Component({
  selector: 'app-import-export-view',
  templateUrl: './import-export-view.component.html',
})
export class ImportExportViewComponent {
  row: ImportExport = this.data['row'];

  fieldNames: string = this.data['fieldNames'];

  constructor(
    public dialogRef: MdDialogRef<ImportExportViewComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
  }
}
