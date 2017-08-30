import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Api} from '../Api';
import {ApiService} from '../ApiService';
import {Plugin} from '../../Plugin/Plugin';
import {PluginService} from '../../Plugin/PluginService';

@Injectable()
export class ApiPluginResolver implements Resolve<Plugin> {
  constructor(
    private apiService: ApiService,
    protected pluginService: PluginService,
    private router: Router
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Plugin> {
    const apiName = route.params[this.apiService.pathParamName];
    const pluginName = route.params['pluginName'];
    return this.apiService.getObject(apiName).then(api => {
      if (api) {
        let plugin;
        for (const plugin2 of api.plugins) {
          if (plugin2.name === pluginName) {
            plugin = plugin2;
          }
        }
        if (plugin == null) {
          plugin = this.pluginService.newObject();
          plugin.api_id = api.id;
          plugin.api = api;
          plugin.name = pluginName;
        }
        return plugin;
      } else {
        this.router.navigate(['/ui/apis']);
        return null;
      }
    });
  }
}
