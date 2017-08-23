import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {
  Injectable,
  Injector,
  Optional
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

import {DOCUMENT} from '@angular/platform-browser';

import {Config} from '../Config';

import {Service} from './Service';

import {LoginDialogComponent} from '../Component/LoginDialogComponent';

import {MessageDialogComponent} from '../Component/MessageDialogComponent';

@Injectable()
export abstract class BaseService<T> implements Service<T> {

  private static loginDialog: MdDialogRef<LoginDialogComponent>;

  protected config = this.injector.get(Config);

  protected document: any = this.injector.get(DOCUMENT);

  protected http = this.injector.get(Http);

  protected location = this.injector.get(Location);

  protected path: string;

  protected typeTitle: string;

  protected labelFieldName: string;

  protected idFieldName = 'id';

  pathParamName = 'id';

  dialog: MdDialog = this.injector.get(MdDialog);

  usePostForDelete = true;

  private jsonHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(
    protected injector: Injector
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

  public httpRequest<R>(request: (http: Http) => Observable<Response>, handler: (response: Response) => R): Promise<R> {
    const response = request(this.http);
    return response.toPromise()
      .then(handler)
      .catch(error => {
        if (error.status === 403) {
          return new Promise((resolve, reject) => {
            let loginDialog = BaseService.loginDialog;
            if (loginDialog) {
              loginDialog.componentInstance.login();
            } else {
              loginDialog = this.dialog.open(LoginDialogComponent, {
                disableClose: true
              });
              BaseService.loginDialog = loginDialog;
              loginDialog.afterClosed().subscribe(dialogResponse => {
                BaseService.loginDialog = null;
              });
            }
            loginDialog.afterClosed().subscribe(dialogResponse => {
              if (dialogResponse === 'Login') {
                this.httpRequest(request, handler).then(
                  validResult => {
                    resolve(validResult);
                  },
                  errorResult => {
                    reject(errorResult);
                  }
                );
              } else {
                reject('Not logged in');
              }
            });
          });
        } else if (error.status === 404) {
          return Promise.resolve(null);
        } else {
          this.showError(error.message || error);
          return Promise.reject(error.message || error);
        }
      }
      );
  }

  protected addObjectDo(path: string, object: T, callback?: () => void): Promise<T> {
    const url = this.getUrl(path);
    const jsonText = JSON.stringify(object);
    return this.httpRequest(
      http => {
        return http.post(
          url,
          jsonText,
          {headers: this.jsonHeaders}
        );
      },
      response => {
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
      }
    );
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

  protected showError(message: string) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'Error',
        message: message,
      }
    });
  }

  public getUrl(path: string): string {
    return this.config.basePath + '/rest' + path;
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
    const handler = httpResponse => {
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
    };

    if (this.usePostForDelete) {
      return this.httpRequest(
        http => {
          return http.post(
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
        },
        handler
      );
    } else {
      return this.httpRequest(
        http => {
          return http.delete(
            url,
            {
              headers: this.jsonHeaders,
              search: params
            }
          );
        },
        handler
      );
    }
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
    return this.httpRequest(
      http => {
        return http.get(url);
      },
      response => {
        const json = response.json();
        if (json.error) {
          this.showError(json.error);
          return null;
        } else {
          return this.toObject(json);
        }
      }
    );
  }

  getObjects(path: string, filter: {[fieldName: string]: string}): Promise<T[]> {
    if (!path) {
      path = this.path;
    }
    return this.getObjectsDo(path, filter);
  }

  getObjectsDo(path: string, filter: {[fieldName: string]: string}): Promise<T[]> {
    const params = new URLSearchParams();
    this.addFilterParams(params, filter);
    const url = this.getUrl(path);

    return this.httpRequest(
      http => {
        return http.get(
          url,
          {
            search: params
          }
        );
      },
      response => {
        return this.getObjectsFromJson(response);
      }
    );
  }

  public getObjectsFromJson(response): T[] {
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
  }

  getPath(): string {
    return this.path;
  }

  private addFilterParams(params: URLSearchParams, filter: {[fieldName: string]: string}) {
    if (filter) {
      for (const fieldName of Object.keys(filter)) {
        const value = filter[fieldName];
        params.append('filterFieldName', fieldName);
        params.append('filterValue', value);
      }
    }
  }
  getRowsPage(
    offset: number,
    limit: number,
    path: string,
    filter: {[fieldName: string]: string}
  ): Promise<any> {
    const params = new URLSearchParams();
    params.set('offset', offset.toString());
    params.set('limit', limit.toString());
    this.addFilterParams(params, filter);
    if (!path) {
      path = this.path;
    }
    const url = this.getUrl(path);
    return this.httpRequest(
      http => {
        return http.get(
          url,
          {
            search: params
          }
        );
      },
      response => {
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
      }
    );
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
    return this.httpRequest(
      http => {
        return http.put(
          url,
          jsonText,
          {headers: this.jsonHeaders}
        );
      },
      response => {
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
      }
    );
  }
}
