import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
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
  Response,
  URLSearchParams
} from '@angular/http';

import {
  MdDialog,
  MdDialogRef
} from '@angular/material';

import { DOCUMENT } from '@angular/platform-browser';

import { Service } from './Service';

import { MessageDialog } from '../Component/MessageDialog';

@Injectable()
export abstract class BaseService<T> implements Service<T> {
  protected document: any = this.injector.get(DOCUMENT);

  protected http: Http = this.injector.get(Http);

  protected location: Location = this.injector.get(Location);

  protected path: string;

  protected typeTitle: string;

  protected labelFieldName: string;

  protected idFieldName = 'id';

  pathParamName = 'id';

  dialog: MdDialog = this.injector.get(MdDialog);

  usePostForDelete = true;

  private jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    protected injector: Injector,
  ) {
  }

  addObject(object: T, path?: string): Promise<T> {
    if (!path) {
      path = this.path;
    }
    return this.addObjectDo(
      path,
      object
    );
  }

  protected addObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = this.getUrl(path);
    const jsonText = JSON.stringify(object);
    return this.http.post(
      url,
      jsonText,
      { headers: this.jsonHeaders }
    ).toPromise()
      .then(response => {
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          Object.assign(object, json);
          if (callback) {
            callback();
          }
          return object;
        }
      })
      .catch(this.handleError.bind(this));
  }

  addOrUpdateObject(object: T): Promise<T> {
    if (object == null) {
      return Promise.resolve(object);
    } else if (object[this.idFieldName]) {
      return this.updateObject(object);
    } else {
      return this.addObject(object);
    }
  }

  protected handleError(error: any): Promise<any> {
    if (error.status === 403) {
      document.location.reload(true);
      return Promise.resolve(null);
    } else if (error.status === 404) {
      return Promise.resolve(null);
    } else {
      this.showError(error.message || error);
      return Promise.reject(error.message || error);
    }
  }

  protected showError(message: string) {
    const dialogRef = this.dialog.open(MessageDialog, {
      data: {
        title: 'Error',
        message: message,
      }
    });
  }

  protected getUrl(path: string): string {
    return this.location.prepareExternalUrl('/rest' + path);
  }

  deleteObject(object: T, path?: string): Promise<boolean> {
    return null;
  }

  protected deleteObjectDo(path: string, callback?: (deleted: boolean) => void, parameters?: any): Promise<boolean> {
    const params = new URLSearchParams();
    if (parameters) {
      for (const name of Object.keys(parameters)) {
        params.set(name, parameters[name]);
      }
    }

    const url = this.getUrl(path);
    let response: Observable<Response>;
    if (this.usePostForDelete) {
      response = this.http.post(
        url,
        '',
        {
          headers: new Headers({
            'Content-Type': 'application/json',
            'X-HTTP-Method-Override': 'DELETE'
          }),
          search: params
        }
      );
    } else {
      response = this.http.delete(
        url,
        {
          headers: this.jsonHeaders,
          search: params
        }
      );
    }
    return response.toPromise()
      .then(httpResponse => {
        const json = httpResponse.json();
        if (json.error) {
          this.showError(json.error);
          return false;
        } else {
          const deleted = json.deleted === true;
          if (callback) {
            callback(deleted);
          }
          return deleted;
        }
      })
      .catch(this.handleError.bind(this));
  }

  getLabel(object: T): string {
    let fieldNames: string[];
    if (this.labelFieldName) {
      fieldNames = this.labelFieldName.split('.');
    } else {
      fieldNames = [this.idFieldName];
    }
    let value: any = object;
    for (const fieldName of fieldNames) {
      if (value == null) {
        return null;
      } else {
        value = value[fieldName];
      }
    }
    return value;
  }

  getObject(id: string): Promise<T> {
    return this.getObjectDo(this.path + '/' + id);
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
          return this.toObject(json);
        }
      })
      .catch(this.handleError.bind(this));
  }

  getObjects(): Promise<T[]> {
    return this.getObjectsDo(this.path);
  }

  getObjectsDo(path: string): Promise<T[]> {
    const params = new URLSearchParams();

    const url = this.getUrl(path);
    return this.http.get(url)
      .toPromise()
      .then(response => {
        const objects: T[] = [];
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
        } else {
          const data = json.data;
          if (data) {
            data.forEach((recordJson: any) => {
              const record = this.toObject(recordJson);
              objects.push(record);
            });
          }
        }
        return objects;
      })
      .catch(this.handleError.bind(this));
  }

  getPath(): string {
    return this.path;
  }

  getRowsPage(
    offset: number,
    limit: number,
    path: string,
    filter: { [fieldName: string]: string }
  ): Promise<any> {
    const params = new URLSearchParams();
    params.set('offset', offset.toString());
    params.set('limit', limit.toString());
    if (filter) {
      for (const fieldName of Object.keys(filter)) {
        const value = filter[fieldName];
        params.append('filterFieldName', fieldName);
        params.append('filterValue', value);
      }
    }
    if (!path) {
      path = this.path;
    }
    const url = this.getUrl(path);
    return this.http.get(
      url,
      {
        search: params
      }
    ).toPromise()
      .then(response => {
        const rows: T[] = [];
        let total = 0;
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          const data = json.data;
          if (data) {
            data.forEach((recordJson: any) => {
              const record = this.toObject(recordJson);
              rows.push(record);
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

  getTypeTitle(): string {
    return this.typeTitle;
  }

  newObject(): T {
    return null;
  }

  toObject(json: any): T {
    const record = this.newObject();
    Object.assign(record, json);
    return record;
  }

  updateObject(object: T): Promise<T> {
    return null;
  }

  protected updateObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = this.getUrl(path);
    const jsonText = JSON.stringify(object);
    return this.http.put(
      url,
      jsonText,
      { headers: this.jsonHeaders }
    ).toPromise()
      .then(response => {
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          Object.assign(object, json);
          if (callback) {
            callback();
          }
          return object;
        }
      })
      .catch(this.handleError.bind(this));
  }
}
