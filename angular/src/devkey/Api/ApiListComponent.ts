import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {BaseListComponent} from '../../shared/Component/BaseListComponent';

import {Api} from './Api';
import {ApiService} from './ApiService';

@Component({
  selector: 'app-api-list',
  templateUrl: 'ApiList.html',
  styles: [`
:host {
  display: flex;
  flex-grow: 1;
}
  `]
})
export class ApiListComponent extends BaseListComponent<Api> implements OnInit {

  constructor(
    injector: Injector,
    service: ApiService
  ) {
    super(injector, service, 'Developer API Keys');
  }

  ngOnInit(): void {
    this.columns = [
      {name: 'Name', sortable: true},
    ];
    super.ngOnInit();
  }

}
