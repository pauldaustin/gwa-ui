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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Api> {
    const apiName = route.params[this.apiService.pathParamName];
    return this.apiService.getObject(apiName).then(api => {
      if (api) {
        return api;
      } else {
        this.router.navigate(['/ui/apis']);
        return null;
      }
    });
  }
}
