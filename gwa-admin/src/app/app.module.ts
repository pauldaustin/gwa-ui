import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdIconRegistry,
  MdInputModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';

import { DeleteDialog } from './Component/DeleteDialog';
import { MessageDialog } from './Component/MessageDialog';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { AuthService } from './Authentication/AuthService';
import { RoleGuard } from './Authentication/RoleGuard';

import { ApiListComponent } from './Api/ApiListComponent';
import { ApiAddComponent } from './Api/ApiAddComponent';
import { ApiDetailComponent } from './Api/ApiDetailComponent';
import { ApiViewComponent } from './Api/ApiViewComponent';
import { ApiService } from './Api/ApiService';
import { ApiResolver } from './Api/ApiResolver';

import { ApiGroupListComponent } from './Api/Group/ApiGroupListComponent';

import { ApiGroupUserListComponent } from './Api/Group/ApiGroupUserListComponent';
import { ApiGroupUserService } from './Api/Group/ApiGroupUserService';

import { ApiPluginListComponent } from './Api/Plugin/ApiPluginListComponent';
import { ApiPluginDetailComponent } from './Api/Plugin/ApiPluginDetailComponent';
import { ApiPluginAddComponent } from './Api/Plugin/ApiPluginAddComponent';

import { UserListComponent } from './User/UserListComponent';
import { UserAddComponent } from './User/UserAddComponent';
import { UserDetailComponent } from './User/UserDetailComponent';
import { UserViewComponent } from './User/UserViewComponent';
import { UserService } from './User/UserService';
import { UserResolver } from './User/UserResolver';

import { UserGroupListComponent } from './User/Group/UserGroupListComponent';
import { UserGroupService } from './User/Group/UserGroupService';

import { UserPluginListComponent } from './User/Plugin/UserPluginListComponent';

import { EndpointDetailComponent } from './Endpoint/EndpointDetailComponent';
import { EndpointViewComponent } from './Endpoint/EndpointViewComponent';
import { EndpointListComponent } from './Endpoint/EndpointListComponent';
import { EndpointResolver } from './Endpoint/EndpointResolver';
import { EndpointService } from './Endpoint/EndpointService';

import { EndpointGroupListComponent } from './Endpoint/Group/EndpointGroupListComponent';

import { EndpointGroupUserListComponent } from './Endpoint/Group/EndpointGroupUserListComponent';
import { EndpointGroupUserService } from './Endpoint/Group/EndpointGroupUserService';

import { GroupUserListComponent } from './Group/GroupUserListComponent';
import { GroupUserService } from './Group/GroupUserService';

import { GroupListComponent } from './Group/GroupListComponent';
import { GroupService } from './Group/GroupService';

import { NodeListComponent } from './Node/NodeListComponent';
import { NodeService } from './Node/NodeService';

import { PluginNameListComponent } from './Plugin/PluginNameListComponent';
import { PluginListComponent } from './Plugin/PluginListComponent';
import { PluginService } from './Plugin/PluginService';

import { StatusDetailComponent } from './Status/StatusDetailComponent';
import { StatusService } from './Status/StatusService';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdToolbarModule,

    NgxDatatableModule,
    BcGovTemplateModule.forRoot({
        title: 'Gateway Admin',
        headerMenuItems: [
          {
            title: 'Endpoints',
            routerLink: 'ui/endpoints'
          },
          {
            title: 'APIs',
            routerLink: 'ui/apis'
          },
          {
            title: 'Plugins',
            routerLink: 'ui/plugins'
          },
          {
            title: 'Users',
            icon: 'person',
            routerLink: 'ui/users'
          },
          {
            title: 'Groups',
            icon: 'people',
            routerLink: 'ui/groups'
          },
          {
            title: 'Nodes',
            routerLink: 'ui/nodes'
          },
          {
            title: 'Status',
            routerLink: 'ui/status'
          }
        ]
      }
    ),
    AppRoutingModule,
  ],
  entryComponents: [
    MessageDialog,
    DeleteDialog
  ],
  declarations: [
    DeleteDialog,
    MessageDialog,
    PageNotFoundComponent,

    ApiAddComponent,
    ApiDetailComponent,
    ApiListComponent,
    ApiViewComponent,
    ApiGroupListComponent,
    ApiGroupUserListComponent,
    ApiPluginDetailComponent,
    ApiPluginAddComponent,
    UserAddComponent,
    UserListComponent,
    UserDetailComponent,
    UserViewComponent,
    UserGroupListComponent,
    EndpointDetailComponent,
    EndpointListComponent,
    EndpointViewComponent,
    EndpointGroupListComponent,
    EndpointGroupUserListComponent,
    GroupListComponent,
    GroupUserListComponent,
    NodeListComponent,
    PluginNameListComponent,
    PluginListComponent,
    ApiPluginListComponent,
    UserPluginListComponent,
    StatusDetailComponent
  ],
  providers: [
    AuthService,
    RoleGuard,

    ApiService,
    ApiResolver,
    ApiGroupUserService,
    UserService,
    UserResolver,
    UserGroupService,
    EndpointService,
    EndpointResolver,
    EndpointGroupUserService,
    GroupService,
    GroupUserService,
    NodeService,
    PluginService,
    StatusService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fa', 'fa');
  }
}

