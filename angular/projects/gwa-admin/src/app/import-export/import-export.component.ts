import {Observable} from 'rxjs';
import {
  Component,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef
} from '@angular/material';

import {BaseListComponent} from 'revolsys-angular-framework';
import {ImportExport} from './import-export';
import {ImportExportService} from './import-export.service';
import {ImportExportViewComponent} from './import-export-view.component';

@Component({
  selector: 'admin-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent extends BaseListComponent<ImportExport> {

  protected http = this.injector.get(HttpClient);

  dialog: MatDialog = this.injector.get(MatDialog);

  importFile: File;

  constructor(
    protected injector: Injector,
    protected service: ImportExportService
  ) {
    super(injector, service, 'Import/Export');
    this.columnNames = ['index', 'type', 'item', 'result'];
  }

  onFileSelect(file: File) {
    this.importFile = file;
  }

  importFileClick() {
    const formData: FormData = new FormData();
    formData.append('file', this.importFile, this.importFile.name);

    this.http.post(this.getUrl('/config/import'), formData).subscribe(
      response => {
        const records = this.service.getObjectsFromJson(response);
        this.arrayDataSource.data = records;
      }
    );
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
