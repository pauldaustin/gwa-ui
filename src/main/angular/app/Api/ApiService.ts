import {
  Injectable,
  Injector
} from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { BaseService } from '../Service/BaseService';

import { Api } from './Api';

@Injectable()
export class ApiService extends BaseService<Api> {
  constructor(injector:Injector) {
    super(injector);
  }

  addObject(api: Api): Promise<Api> {
    return this.addObjectDo(
      '/apis',
      api
    );
  }

  deleteObject(api: Api): Promise<boolean> {
    return this.deleteObjectDo(
      `/apis/${api.id}`
    );
  }

  getApi(id: string): Promise<Api> {
    const url = `${this.serviceUrl}/apis/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toObject(data);
      })
      .catch(this.handleError);
  }

  getApis(): Promise<Api[]> {
    return this.http.get(`${this.serviceUrl}/apis`)
      .toPromise()
      .then(response => {
        let apis: Api[] = [];
        const data = response.json().data;
        if (data) {
          data.forEach((apiJson: any) => {
            let api = this.toObject(apiJson);
            apis.push(api);
          });
        }
        return apis;
      })
      .catch(this.handleError);
  }


  getMyApis(): Promise<Api[]> {
    const url = `${this.serviceUrl}/apis/my`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let apis: Api[] = [];
        const data = response.json().data;
        if (data) {
          data.forEach((apiJson: any) => {
            let api = this.toObject(apiJson);
            apis.push(api);
          });
        }
        return apis;
      })
      .catch(this.handleError);
  }

  updateObject(api: Api): Promise<Api> {
    return this.updateObjectDo(
      `/apis/${api.id}`,
      api
    );
  }

  toObject(apiJson: any): Api {
    let api = new Api();
    Object.assign(api, apiJson);
    return api;
  }
}
