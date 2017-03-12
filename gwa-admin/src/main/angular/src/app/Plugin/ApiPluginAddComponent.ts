import 'rxjs/add/operator/switchMap';

import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';

import { Api } from '../Api/Api';
import { Plugin } from './Plugin';
import { PluginService } from './PluginService';
import { ApiPluginDetailComponent } from './ApiPluginDetailComponent';

@Component({
  selector: 'api-plugin-add',
  templateUrl: 'ApiPluginDetail.html'
})
export class ApiPluginAddComponent extends ApiPluginDetailComponent {
}
