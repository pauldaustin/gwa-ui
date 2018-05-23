import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Api} from '../../Api';
import {ApiService} from '../../api.service';
import {Plugin} from '../../../Plugin/Plugin';
import {PluginService} from '../../../Plugin/plugin.service';

@Injectable()
export class ApiPluginUserResolver implements Resolve<Plugin> {
  constructor(
    private apiService: ApiService,
    protected pluginService: PluginService,
    private router: Router
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plugin> {
    const apiName = route.params[this.apiService.pathParamName];
    const pluginName = route.params['pluginName'];
    const username = route.params['username'];
    return this.apiService.getObject(apiName).pipe(
      mergeMap(api => {
        if (api) {
          return this.pluginService.getObjectDo(`/apis/${api.id}/plugins/${pluginName}/users/${username}`, {
            api: api,
            api_id: api.id
          });
        } else {
          this.router.navigate(['/ui/apis']);
          return null;
        }
      })
    );
  }
}
