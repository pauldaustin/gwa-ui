import { 
  Injector, 
  OnInit 
} from '@angular/core';
import {
  Location
} from '@angular/common';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { Service } from '../Service/Service';
import { MessageDialog } from '../Component/MessageDialog';

export class BaseComponent<T> implements OnInit {

  protected dialogService: DialogService = this.injector.get(DialogService);

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
    this.router.navigate(['/app' +this.service.getPath()]);
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