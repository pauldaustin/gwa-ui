import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../Service/BaseService';
import { Endpoint } from './Endpoint';

@Injectable()
export class EndpointService extends BaseService<Endpoint> {
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
    const url = this.getUrl('/version');
    this.http.get(url)
      .toPromise()
      .then(response => {
        const json = response.json();
        if (!json.error) {
          if (json.version) {
            this.oldVersion = json.version.indexOf('0.9') == 0;
          }
        }
      });
  }

  deleteObject(endpoint: Endpoint): Promise<boolean> {
    return this.deleteObjectDo(
      `/endpoints/${endpoint.id}`
    );
  }

  getMyEndpoints(): Promise<Endpoint[]> {
    return this.getObjectsDo('/endpoints/my');
  }

  updateObject(endpoint: Endpoint): Promise<Endpoint> {
    return this.updateObjectDo(
      `/endpoints/${endpoint.id}`,
      endpoint
    );
  }

  newObject(): Endpoint {
    return new Endpoint();
  }
}
