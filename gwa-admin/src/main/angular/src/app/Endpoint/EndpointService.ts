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

  constructor(injector:Injector) {
    super(injector);
    this.path = `/endpoints`;
    this.typeTitle = 'Endpoint';
    this.labelFieldName = 'config.name';
  }

  deleteObject(api : Api): Promise<boolean> {
    return Promise.resolve(false);
  }

  updateObject(api : Api): Promise<Api> {
    return this.updateObjectDo(
      `/endpoints/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return null;
  }
}
