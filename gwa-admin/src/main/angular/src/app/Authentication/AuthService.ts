import { Observable } from 'rxjs/Observable';
import {
  Injectable,
  Injector
} from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { BaseService } from '../Service/BaseService';

@Injectable()
export class AuthService extends BaseService<any>  {
  roles : string[];
  
  constructor(injector:Injector) {
    super(injector);
  }

  hasRole(role : string) : Observable<boolean> {
    return this.getRoles(roles => {return roles.indexOf(role) != -1});
  }

  hasAnyRole(roles : string[]) : Observable<boolean> {
    return this.getRoles(userRoles => {
      for (var role of roles) {
        if (userRoles.indexOf(role) != -1) {
          return true;
        }
      }
      return false;
    });
  }

  private getRoles(callback : (roles : string[]) => boolean) : Observable<boolean> {
    if (this.roles == null) {
      const url = this.getUrl('/authentication');
      return this.http.get(url)
        .map(response => {
          const json = response.json();
          if (!json.error) {
            this.roles = json.roles;
          }
          return callback(this.roles);
        })
        .catch(() => { return Observable.of(false)});
    } else {
      return Observable.of( callback(this.roles));
    }
  }
}