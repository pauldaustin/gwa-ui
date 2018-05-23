import {
  Observable,
  of
} from 'rxjs';
import {
  Injectable,
  Injector
} from '@angular/core';
import {BaseService} from 'revolsys-angular-framework';
import {Api} from '../Api/Api';

@Injectable()
export class EndpointService extends BaseService<Api> {
  constructor(injector: Injector) {
    super(injector);
    this.path = '/endpoints';
    this.pathParamName = 'apiName';
    this.typeTitle = 'Endpoint';
    this.labelFieldName = 'name';
  }

  deleteObject(api: Api, path?: string): Observable<boolean> {
    return of(false);
  }

  updateObject(api: Api): Observable<Api> {
    return this.updateObjectDo(
      `/endpoints/${api.id}`,
      api
    );
  }

  newObject(): Api {
    return new Api();
  }
}
