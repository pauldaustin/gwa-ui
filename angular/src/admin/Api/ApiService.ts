import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector
} from '@angular/core';
import { BaseService } from '../../Service/BaseService';
import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/apis';
    this.pathParamName = 'apiName';
    this.typeTitle = 'API';
    this.labelFieldName = 'name';
  }

  deleteObject(api: Api, path?: string): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${api.id}`
    );
  }

  updateObject(api: Api): Promise<Api> {
    return this.updateObjectDo(
      `/apis/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return new Api();
  }
}
