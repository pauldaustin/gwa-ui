import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {PluginService} from '../../../Plugin/plugin.service';
import {ApiPluginViewComponent} from '../api-plugin-view.component';

@Component({
  selector: 'admin-api-plugin-user-view',
  templateUrl: 'api-plugin-user-view.component.html'
})
export class ApiPluginUserViewComponent extends ApiPluginViewComponent implements OnInit {

  constructor(
    protected injector: Injector,
    protected service: PluginService,
    protected route: ActivatedRoute,
  ) {
    super(injector, service, route);
  }

}
