import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../../shared/Service/BaseService';
import { Api } from '../Api/Api';

@Injectable()
export class EndpointService extends BaseService<Api> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/endpoints';
    this.pathParamName = 'apiName';
    this.typeTitle = 'Endpoint';
    this.labelFieldName = 'name';
  }

  deleteObject(api: Api, path?: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  updateObject(api: Api): Promise<Api> {
    return this.updateObjectDo(
      `/endpoints/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return new Api();
  }
}
