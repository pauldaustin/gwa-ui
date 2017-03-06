import { 
  Injector, 
  OnInit 
} from '@angular/core';

import {Router } from '@angular/router';

import { DialogService } from "ng2-bootstrap-modal";

import { Service } from '../Service/Service';

import { MessageDialog } from '../Component/MessageDialog';

export class BaseComponent<T> implements OnInit {
  protected router: Router = this.injector.get(Router);

  protected dialogService: DialogService = this.injector.get(DialogService);

  constructor(
    protected injector:Injector,
    protected service: Service<T>
  ) {
  }
    
  ngOnInit(): void {
  }

  protected showError(message: string) {
    if (this.dialogService != null) {
      let disposable = this.dialogService.addDialog(
        MessageDialog, {
          title:'Error', 
          message:message,
          alertType: 'danger'
        }
      );
    }
  }
}