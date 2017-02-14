import {
  Injectable,
  Injector
} from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GwaConstants } from '../GwaConstants';

import { Service } from './Service';

@Injectable()
export abstract class BaseService<T> implements Service<T> {
  protected http: Http = this.injector.get(Http);
  
  protected readonly serviceUrl = GwaConstants.serviceUrl;

  private jsonHeaders = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(protected injector:Injector) {
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  protected addObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = `${this.serviceUrl}/${path}`;
    const jsonText = JSON.stringify(object);
    return this.http.post(
      url,
      jsonText,
      this.jsonHeaders
    ).toPromise()
      .then(response => {
        let data = response.json().data;
        Object.assign(object, data);
        if (callback) {
          callback();
        }
        return object;
      })
      .catch(this.handleError);
  }

  protected deleteObjectDo(path: string, callback?: (deleted: boolean) => void): Promise<boolean> {
   const url = `${this.serviceUrl}/${path}`;
    return this.http.delete(
      url,
      this.jsonHeaders
    ).toPromise()
      .then(response => {
        var deleted = response.json().data.deleted == true;
        if (callback) {
          callback(deleted);
        }
        return deleted;
      })
      .catch(this.handleError);
  }

  protected updateObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = `${this.serviceUrl}/${path}`;
    const jsonText = JSON.stringify(object);
    return this.http.put(
      url,
      jsonText,
      this.jsonHeaders
    ).toPromise()
      .then(response => {
        let data = response.json().data;
        Object.assign(object, data);
        if (callback) {
          callback();
        }
        return object;
      })
      .catch(this.handleError);
  }

  addObject(object: T): Promise<Plugin> {
    return null;
  }

  deleteObject(object: T): Promise<boolean> {
    return null;
  }

  toObject(json: any): T {
    return null;
  }

  updateObject(object: T): Promise<T> {
    return null;
  }
}
