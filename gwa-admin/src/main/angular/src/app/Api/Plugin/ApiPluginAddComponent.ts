import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  FormControl,
} from '@angular/forms';

import { Router } from '@angular/router';

import { Api } from '../Api';
import { Plugin } from '../../Plugin/Plugin';
import { PluginService } from '../../Plugin/PluginService';
import { ApiPluginDetailComponent } from './ApiPluginDetailComponent';

@Component({
  selector: 'api-plugin-add',
  templateUrl: 'ApiPluginDetail.html'
})
export class ApiPluginAddComponent extends ApiPluginDetailComponent {
}
