import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Api } from '../Api/Api';
import { EndpointService } from './endpoint.service';

@Injectable()
export class EndpointResolver implements Resolve<Api> {
  constructor(
    private service: EndpointService,
    private router: Router
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Api> {
    const apiName = route.params[this.service.pathParamName];
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