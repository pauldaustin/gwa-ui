import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Api} from './Api';
import {ApiService} from './api.service';

@Injectable()
export class ApiResolver implements Resolve<Api> {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Api> {
    const apiName = route.params[this.apiService.pathParamName];
    return this.apiService.getObject(apiName).pipe(
      filter(api => {
        if (api) {
          return true;
        } else {
          this.router.navigate(['/ui/apis']);
          return false;
        }
      })
    );
  }
}
