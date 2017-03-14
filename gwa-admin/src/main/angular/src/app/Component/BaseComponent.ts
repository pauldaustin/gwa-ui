import { 
  Injector, 
  OnInit 
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { Service } from '../Service/Service';
import { MessageDialog } from '../Component/MessageDialog';

export class BaseComponent<T> implements OnInit {

  dialog: MdDialog = this.injector.get(MdDialog);

  protected location: Location = this.injector.get(Location);

  protected route: ActivatedRoute = this.injector.get(ActivatedRoute);

  protected router: Router = this.injector.get(Router);

  constructor(
    protected injector:Injector,
    protected service: Service<T>
  ) {
  }
    
  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/ui' +this.service.getPath()]);
  }

  protected showError(message: string) {
    let dialogRef = this.dialog.open(MessageDialog, {
      data: {
        title: 'Error',
        message: message,
      }
    });
  }
}