import {
  Injectable,
  Injector
} from '@angular/core';

import {
  Location
} from '@angular/common';

import {
  Headers, 
  Http,
  URLSearchParams
} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Service } from './Service';

@Injectable()
export abstract class BaseService<T> implements Service<T> {
  protected http: Http = this.injector.get(Http);

  protected location: Location = this.injector.get(Location);

  private jsonHeaders = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

  constructor(protected injector:Injector) {
  }

  addObject(object: T): Promise<T> {
    return null;
  }
  
  protected addObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = this.getUrl(path);
    const jsonText = JSON.stringify(object);
    return this.http.post(
      url,
      jsonText,
      this.jsonHeaders
    ).toPromise()
      .then(response => {
        let data = response.json();
        Object.assign(object, data);
        if (callback) {
          callback();
        }
        return object;
      })
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  protected getUrl(path: string): string {
    return this.location.prepareExternalUrl('/rest' + path);
  }

  protected updateObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = this.getUrl(path);
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


  deleteObject(object: T): Promise<boolean> {
    return null;
  }

  protected deleteObjectDo(path: string, callback?: (deleted: boolean) => void, parameters?: any): Promise<boolean> {
    let params = new URLSearchParams();
    if (parameters) {
      for (let name in parameters) {
        params.set(name, parameters[name]);
      }
    }

    const url = this.getUrl(path);
    return this.http.delete(
      url,
      {
        headers: new Headers({ 'Content-Type': 'application/json' }),
        search: params
      }
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

  getObject(id: string): Promise<T> {
    return null;
  }
    
  getObjectDo(path: string): Promise<T> {
    const url = this.getUrl(path);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toObject(data);
      })
      .catch(this.handleError);
  }

  getObjects(): Promise<T[]> {
    return null;
  }
  
  getObjectsDo(path: string): Promise<T[]> {
    let params = new URLSearchParams();

    const url = this.getUrl(path);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let objects: T[] = [];
        const data = response.json().data;
        if (data) {
          data.forEach((json: any) => {
            let object = this.toObject(json);
            objects.push(object);
          });
        }
        return objects;
      })
      .catch(this.handleError);
  }
 
  getRowsPage(offset: number, limit: number): Promise<any> {
    return null;
  }
  
  getRowsPageDo(path: string, offset: number, limit: number): Promise<any> {
    let params = new URLSearchParams();
    params.set('offset', offset.toString()); 
    params.set('limit', limit.toString()); 
    const url = this.getUrl(path);
    return this.http.get(
      url,
      {
        search: params
      }
    ).toPromise()
      .then(response => {
        let rows: T[] = [];
        const json = response.json();
        const data = json.data;
        if (data) {
          data.forEach((json: any) => {
            let object = this.toObject(json);
            rows.push(object);
          });
        }
        return {
          rows: data,
          count: json.total
        };
      })
      .catch(this.handleError);
  }

  newObject(): T {
    return null;
  }
  
  toObject(json: any): T {
    let object = this.newObject();
    Object.assign(object, json);
    return object;
  }

  updateObject(object: T): Promise<T> {
    return null;
  }
}
