import {Observable} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from 'revolsys-angular-framework';
import {Api} from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {

  constructor(injector: Injector) {
    super(injector);
    this.path = '/apis';
    this.pathParamName = 'apiName';
    this.typeTitle = 'API';
    this.labelFieldName = 'name';
  }

  deleteObject(api: Api, path?: string): Observable<boolean> {
    return this.deleteObjectDo(
      `/apis/${api.id}`
    );
  }

  updateObject(api: Api): Observable<Api> {
    return this.updateObjectDo(
      `/apis/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return new Api();
  }
}
