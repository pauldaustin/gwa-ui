import {
  Component,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Headers,
  Http,
  Response,
  URLSearchParams
} from '@angular/http';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';
import {ImportExport} from './import-export';
import {ImportExportService} from './import-export.service';
import {ImportExportViewComponent} from './import-export-view.component';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent extends BaseListComponent<ImportExport> {

  protected http = this.injector.get(Http);

  @ViewChild('importTable') table: any;

  dialog: MatDialog = this.injector.get(MatDialog);

  importFile: File;

  constructor(
    protected injector: Injector,
    protected service: ImportExportService
  ) {
    super(injector, service, 'Import/Export');
  }

  onFileSelect(file: File) {
    this.importFile = file;
  }

  importFileClick() {
    const headers = new Headers();
    const formData: FormData = new FormData();
    formData.append('file', this.importFile, this.importFile.name);

    const returnReponse = new Promise((resolve, reject) => {
      this.http.post(this.getUrl('/config/import'), formData, {
        headers: headers
      }).subscribe(
        response => {
          const rows = this.service.getObjectsFromJson(response);
          this.setRows(rows);
        },
        error => {
        }
        );
    });
  }

  refresh() {
  }

  protected showView(row: ImportExport) {
    const dialogRef = this.dialog.open(ImportExportViewComponent, {
      data: {
        row: row,
        fieldNames: Object.keys(row.config)
      }
    });
  }

}
