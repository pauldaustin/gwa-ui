import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import { BaseDetailComponent } from '../../shared/Component/BaseDetailComponent';

import { Api } from './Api';
import { Plugin } from '../Plugin/Plugin';
import { ApiService } from './ApiService';

@Component({
  selector: 'app-api-view',
  templateUrl: 'ApiView.html'
})
export class ApiViewComponent extends BaseDetailComponent<Api> implements OnInit {
  endpoint: Plugin = new Plugin(
    'bcgov-gwa-endpoint',
    {
      api_owners: [],
    }
  );

  keyAuth: Plugin = new Plugin(
    'key-auth',
    {
      key_names: 'apikey',
      hide_credentials: false,
      anonymous: null
    },
    false
  );

  acl: Plugin = new Plugin(
    'acl',
    {
      whitelist: [],
      blacklist: []
    },
    false
  );

  constructor(
    protected injector: Injector,
    protected service: ApiService
  ) {
    super(injector, service, 'API - Gateway Admin');
    this.idParamName = 'apiName';
  }

  ngOnInit() {
    if (this.addPage) {
      super.ngOnInit();
    } else {
      this.route.parent.data
        .subscribe((data: { api: Api }) => {
          this.setObject(data.api);
        }
        );
    }
  }

  protected setObject(api: Api) {
    if (api) {
      this.setTitle(`API: ${api.name} - Gateway Admin`);
      const endpoint = api.plugin('bcgov-gwa-endpoint');
      if (endpoint == null) {
        api.pluginAdd(this.endpoint);
      } else {
        this.endpoint = endpoint;
      }
      const keyAuth = api.plugin('key-auth');
      if (keyAuth == null) {
        api.pluginAdd(this.keyAuth);
      } else {
        this.keyAuth = keyAuth;
      }
      const acl = api.plugin('acl');
      if (acl == null) {
        api.pluginAdd(this.acl);
      } else {
        this.acl = acl;
      }
    }
    super.setObject(api);
  }

  addApiOwner() {
    this.endpoint.config.api_owners.push('');
  }

  deleteApiOwner(index: number) {
    const api_owners = this.endpoint.config.api_owners;
    if (index < api_owners.length) {
      api_owners.splice(index);
    }
  }

  addGroupName() {
    this.acl.config.whitelist.push('');
  }

  deleteGroupName(index: number) {
    const groupNames = this.acl.config.whitelist;
    if (index < groupNames.length) {
      groupNames.splice(index);
    }
  }

  get developerKeyGroupNames(): string[] {
    const groupNames: string[] = [];
    if (this.acl && this.acl.config.whitelist) {
      for (let groupName of this.acl.config.whitelist) {
        groupName = groupName.trim().toLowerCase();
        if (groupName.length === 0) {
        } else if (groupName.indexOf('idir') === 0) {
        } else if (groupName.indexOf('github') === 0) {
        } else {
          groupNames.push(groupName);
        }
      }
    }
    return groupNames;
  }

  routeDetail(): void {
    this.router.navigate(['..', this.object.name], { relativeTo: this.route });
  }

  formValid(): boolean {
    return (this.object.hosts && this.object.hosts.length > 0) || (this.object.uris && this.object.uris.length > 0);
  }
}
