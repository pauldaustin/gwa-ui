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
import { DOCUMENT } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { AuthService } from '../Authentication/AuthService';
import { Service } from '../Service/Service';
import { MessageDialog } from '../Component/MessageDialog';

export class BaseComponent<T> implements OnInit {

  protected authService: AuthService = this.injector.get(AuthService);

  dialog: MdDialog = this.injector.get(MdDialog);

  document: any = this.injector.get(DOCUMENT);

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

  routeList(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  protected showError(message: string) {
    let dialogRef = this.dialog.open(MessageDialog, {
      data: {
        title: 'Error',
        message: message,
      }
    });
  }

  hasRole(role : string) : boolean {
    return this.authService.hasRole(role);
  }

  get username() : string {
    return this.authService.username;
  }
  
  trackByIndex(index : number) : number { 
    return index;
  }
  
  stringValue(object : any) : string {
    if (object) {
      if (Array.isArray(object)) {
        if (object.length > 0) {
          return object.join();
        }
      } else {
        return object.toString();
      }
    }
    return '-';
  }
}