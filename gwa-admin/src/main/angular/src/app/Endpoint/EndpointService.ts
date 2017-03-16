import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Api } from '../Api/Api';
import { Plugin } from '../Plugin/Plugin';

@Injectable()
export class EndpointService extends BaseService<Api> {
  oldVersion : boolean = true;

  endPointUriTemplates : string[] = [
    'https://{name}.apps.local.revolsys.com',
    'https://{name}.apis.local.revolsys.com',
  ];

  constructor(injector:Injector) {
    super(
      injector,
      '/endpoints',
      'API',
      'name'
    );
  }

  deleteObject(api : Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/endpoints/${api.id}`
    );
  }

  getMyEndpoints(): Promise<Endpoint[]> {
    return this.getObjectsDo('/endpoints/my');
  }

  updateObject(api : Api): Promise<Api> {
    return this.updateObjectDo(
      `/endpoints/${api.id}`,
      endpoint
    );
  }

  newObject(): Api {
    const plugin = new Plugin();
    plugin.name = 'bcgov-gwa-endpoint';
    plugin.config = {
      uri_template: endPointUriTemplates[0],
      upstream_username: null,
      upstream_password: null
    }

    const api = new Api();
    api.pluginAdd(api);

    return api;
  }
}
