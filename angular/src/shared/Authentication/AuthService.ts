import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {BaseService} from '../Service/BaseService';

@Injectable()
export class AuthService extends BaseService<any>  {
  username: string;
  roles: string[];

  constructor(injector: Injector) {
    super(injector);
    const url = this.getUrl('/authentication');
    this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        const json = response.json();
        if (json.error) {
          this.roles = [];
        } else {
          this.roles = json.roles;
          this.username = json.name;
        }
      }
    );
  }

  hasRole(role: string): boolean {
    if (this.roles == null) {
      return true;
    } else {
      return this.roles.indexOf(role) !== -1;
    }
  }

  hasAnyRole(roles: string[]): boolean {
    if (this.roles == null) {
      return true;
    } else {
      for (const role of roles) {
        if (this.roles.indexOf(role) !== -1) {
          return true;
        }
      }
      return false;
    }
  }

  hasAnyRoleAsync(roles: string[]): Observable<boolean> {
    if (this.roles == null) {
      const url = this.getUrl('/authentication');
      return this.http.get(url)
        .map(response => {
          const json = response.json();
          if (json.error) {
            this.roles = [];
          } else {
            this.roles = json.roles;
          }
          return this.hasAnyRole(roles);
        });
    } else {
      return Observable.of(this.hasAnyRole(roles));
    }
  }
}
