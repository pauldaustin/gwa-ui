import 'rxjs/add/operator/switchMap';

import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Api} from '../Api';
import {Plugin} from '../../Plugin/Plugin';

@Component({
  selector: 'app-api-plugin-detail',
  templateUrl: 'api-plugin-detail.component.html'
})
export class ApiPluginDetailComponent implements OnInit {
  api: Api;
  plugin: Plugin;

  constructor(
    protected route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {plugin: Plugin}) => {
        this.plugin = data.plugin;
        this.api = this.plugin.api;
      }
      );
  }
}
