import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Api} from '../Api/Api';
import {EndpointService} from './endpoint.service';

@Injectable()
export class EndpointResolver implements Resolve<Api> {
  constructor(
    private service: EndpointService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Api> {
    const apiName = route.params[this.service.pathParamName];
    return this.service.getObject(apiName).pipe(
      filter(api => {
        if (api) {
          return true;
        } else {
          this.router.navigate(['/ui/endpoints']);
          return false;
        }
      })
    );
  }
}
