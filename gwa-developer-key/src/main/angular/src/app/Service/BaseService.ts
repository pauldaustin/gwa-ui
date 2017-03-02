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

import { DialogService } from "ng2-bootstrap-modal";

import { Service } from './Service';

import { MessageDialog } from '../Component/MessageDialog';

@Injectable()
export abstract class BaseService<T> implements Service<T> {
  protected http: Http = this.injector.get(Http);

  protected location: Location = this.injector.get(Location);
  
  protected dialogService: DialogService = this.injector.get(DialogService);

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
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          const data = json.data;
          Object.assign(object, data);
          if (callback) {
            callback();
          }
          return object;
        }
      })
      .catch(this.handleError.bind(this));
  }

  protected handleError(error: any): Promise<any> {
    this.showError(error.message || error);
    return Promise.reject(error.message || error);
  }

  protected showError(message: string) {
    if (this.dialogService != null) {
      let disposable = this.dialogService.addDialog(
        MessageDialog, {
          title:'Error', 
          message:message,
          alertType: 'danger'
        }
      );
    }
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
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          let data = json.data;
          Object.assign(object, data);
          if (callback) {
            callback();
          }
          return object;
        }
      })
      .catch(this.handleError.bind(this));
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
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return false;
        } else {
          let data = json.data;
          var deleted = data.deleted == true;
          if (callback) {
            callback(deleted);
          }
          return deleted;
        }
      })
      .catch(this.handleError.bind(this));
  }

  getObject(id: string): Promise<T> {
    return null;
  }
    
  getObjectDo(path: string): Promise<T> {
    const url = this.getUrl(path);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          let data = json.data;
          return this.toObject(data);
        }
      })
      .catch(this.handleError.bind(this));
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
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
        } else {
          const data = json.data;
          if (data) {
            data.forEach((json: any) => {
              let object = this.toObject(json);
              objects.push(object);
            });
          }
        }
        return objects;
      })
      .catch(this.handleError.bind(this));
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
        let total = 0;
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          const data = json.data;
          if (data) {
            data.forEach((json: any) => {
              let object = this.toObject(json);
              rows.push(object);
            });
            total = json.total;
          }
        }
        return {
          rows: rows,
          count: total
        };
      })
      .catch(this.handleError.bind(this));
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
