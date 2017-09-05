import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class ArrayDataSource<T> extends DataSource<any> {
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  connect(): Observable<T[]> {
    return this.dataChange;
  }

  setData(data: T[]) {
    this.dataChange.next(data);
  }

  disconnect() {
  }
}
