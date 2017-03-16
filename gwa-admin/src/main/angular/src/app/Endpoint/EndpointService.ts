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
      'Endpoint',
      'config.name'
    );
  }

  deleteObject(api : Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/endpoints/${api.id}`
    );
  }

  updateObject(api : Api): Promise<Api> {
    return this.updateObjectDo(
      `/endpoints/${api.id}`,
      api
    );
  }

  newObject(): Api {
    const endPoint = new Plugin();
    endPoint.name = 'bcgov-gwa-endpoint';
    endPoint.config = {
      uri_template: this.endPointUriTemplates[0],
      upstream_username: null,
      upstream_password: null
    }
    
    const api = new Api();
    api.pluginAdd(endPoint);

    return api;
  }
}
