import {
  Injector,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';

import { BaseComponent } from './BaseComponent';
import { DeleteDialog } from './DeleteDialog';

import { Service } from '../Service/Service';

export class BaseListComponent<T> extends BaseComponent<T> {

  @ViewChild('idT') idTemplate: TemplateRef<any>;

  @ViewChild('actionsT') actionsTemplate: TemplateRef<any>;

  @ViewChild('dateT') dateTemplate: TemplateRef<any>;

  @ViewChild('flagT') flagTemplate: TemplateRef<any>;

  @ViewChild('arrayT') arrayTemplate: TemplateRef<any>;

  columns : any[];

  dialog: MdDialog = this.injector.get(MdDialog);
  
  rows: Array<T> = [];

  count: number = 0;

  offset: number = 0;

  limit: number = 20;

  filterFields : any[];
  
  filterFieldName : string;
   
  filterValue : string;
  
  filter : { [fieldName: string] : string} = {};
  
  paging: boolean = false;
  
  path: string;

  cssClasses= {
    sortAscending: 'fa fa-chevron-down',
    sortDescending: 'fa fa-chevron-up',
    pagerLeftArrow: 'fa fa-chevron-left',
    pagerRightArrow: 'fa fa-chevron-right',
    pagerPrevious: 'fa fa-step-backward',
    pagerNext: 'fa fa-step-forward'
  }
  constructor(injector: Injector, service : Service<T>) {
    super(injector, service);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    if (this.paging) {
      this.page(this.offset, this.limit);
    } else {
      this.service.getObjects().then(objects => this.rows = objects);
    }
  }

  deleteObject(object: T): void {
    let dialogRef = this.dialog.open(DeleteDialog, {
      data: {
        typeTitle: this.service.getTypeTitle(),
        objectLabel: this.service.getLabel(object),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Delete') {
        this.deleteObjectDo(object);
      }
    });
  }

  protected deleteObjectDo(object: T): void {
    this.service.deleteObject(object, this.path)
      .then((deleted) => {
        if (deleted) {
          this.onDeleted(object);
        }
      })
    ;
  }

  onDeleted(object: T): void {
    if (this.paging) {
      this.refresh();
    } else {
      this.rows = this.rows.filter(row => row !== object);
    }
  }

  getRows() : Array<T> {
   return this.rows;
  }

  page(offset: number, limit: number) {
    this.fetch(offset, limit, (results: any) => {
      this.count = results.count;
      this.rows = results.rows;
    });
  }
  
  fetch(offset: number, limit: number, callback: any) {
    const filter : { [fieldName: string] : string} = {};
    if (this.filter) {
      for (const fieldName in this.filter) {
        filter[fieldName] = this.filter[fieldName];
      }
    }
    if (this.filterFieldName) {
      filter[this.filterFieldName] = this.filterValue;
    }
    this.service.getRowsPage(
      offset, 
      limit, 
      this.path,
      this.filter
    ).then(callback);
  }

  onPage(event: any) {
    this.page(event.offset, event.limit);
  }
}