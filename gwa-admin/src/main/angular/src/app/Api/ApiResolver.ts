import { Injectable } from '@angular/core';
import { 
  Router, 
  Resolve, 
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Api } from './Api';
import { ApiService } from './ApiService';

@Injectable()
export class ApiResolver implements Resolve<Api> {
  constructor(
    private service: ApiService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Api> {
    let apiName = route.params[this.service.pathParamName];
    return this.service.getObject(apiName).then(api => {
      if (api) {
        return api;
      } else {
        this.router.navigate(['/ui/apis']);
        return null;
      }
    });
  }
}