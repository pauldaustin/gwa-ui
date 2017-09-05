import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdIconRegistry,
  MdInputModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {
  BcGovTemplateComponent
} from '../shared/bcgov-template/BcGovTemplateComponent';
import {SharedModule} from '../shared/shared.module';

import {AuthService} from '../shared/Authentication/auth.service';
import {RoleGuard} from '../shared/Authentication/RoleGuard';

import {ApiListComponent} from './Api/api-list.component';
import {ApiAddComponent} from './Api/api-add.component';
import {ApiViewTabsComponent} from './Api/api-view-tabs.component';
import {ApiViewComponent} from './Api/api-view.component';
import {ApiService} from './Api/api.service';
import {ApiResolver} from './Api/api.resolver';

import {ApiGroupListComponent} from './Api/Group/api-group-list.component';

import {ApiGroupUserListComponent} from './Api/Group/api-group-user-list.component';
import {ApiGroupUserService} from './Api/Group/api-group-user.service';
import {ApiGroupUserPluginListComponent} from './Api/Group/api-group-user-plugin-list.component';

import {ApiPluginListComponent} from './Api/Plugin/api-plugin-list.component';
import {ApiPluginViewComponent} from './Api/Plugin/api-plugin-view.component';
import {ApiPluginResolver} from './Api/Plugin/api-plugin.resolver';

import {ApiPluginUserListComponent} from './Api/Plugin/User/api-plugin-user-list.component';
import {ApiPluginUserViewComponent} from './Api/Plugin/User/api-plugin-user-view.component';
import {ApiPluginUserResolver} from './Api/Plugin/User/api-plugin-user.resolver';

import {Config} from '../shared/Config';

import {UserListComponent} from './User/user-list.component';
import {UserAddComponent} from './User/user-add.component';
import {UserDetailComponent} from './User/user-view-tabs.component';
import {UserViewComponent} from './User/user-view.component';
import {UserService} from './User/user.service';
import {UserResolver} from './User/user-resolver';

import {UserGroupListComponent} from './User/Group/user-group-list.component';
import {UserGroupService} from './User/Group/user-group.service';

import {UserPluginListComponent} from './User/Plugin/user-plugin-list.component';

import {UserDataNameListComponent} from './User/Data/user-data-name-list.component';
import {UserDataListTabsComponent} from './User/Data/user-data-list-tabs.component';
import {UserDataListComponent} from './User/Data/user-data-list.component';
import {UserDataViewTabsComponent} from './User/Data/user-data-view-tabs.component';
import {UserDataViewComponent} from './User/Data/user-data-view.component';
import {UserDataService} from './User/Data/user-data.service';

import {EndpointViewTabsComponent} from './Endpoint/endpoint-view-tabs.component';
import {EndpointViewComponent} from './Endpoint/endpoint-view.component';
import {EndpointListComponent} from './Endpoint/endpoint-list.component';
import {EndpointResolver} from './Endpoint/endpoint.resolver';
import {EndpointService} from './Endpoint/endpoint.service';

import {EndpointGroupListComponent} from './Endpoint/Group/endpoint-group-list.component';

import {EndpointGroupUserListComponent} from './Endpoint/Group/endpoint-group-user-list.component';
import {EndpointGroupUserService} from './Endpoint/Group/endpoint-group-user.service';

import {GroupUserListComponent} from './Group/group-user-list.component';
import {GroupUserService} from './Group/group-user.service';

import {GroupListComponent} from './Group/group-list.component';
import {GroupService} from './Group/group.service';

import {PluginNameListComponent} from './Plugin/plugin-name-list.component';
import {PluginListComponent} from './Plugin/plugin-list.component';
import {PluginService} from './Plugin/plugin.service';

import {StatusViewComponent} from './Status/status-view.component';
import {StatusService} from './Status/status.service';

import {ImportExportComponent} from './import-export/import-export.component';
import {ImportExportViewComponent} from './import-export/import-export-view.component';
import {ImportExportService} from './import-export/import-export.service';

import {AppRoutingModule} from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    CdkTableModule,

    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdTabsModule,
    MdTableModule,
    MdToolbarModule,

    NgxDatatableModule,
    SharedModule.forRoot({
      basePath: '/int',
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
          title: 'Status',
          routerLink: 'ui/status'
        },
        {
          title: 'Import/Export',
          routerLink: 'ui/importExport'
        }
      ]
    }
    ),
    AppRoutingModule,
  ],
  entryComponents: [
    ImportExportViewComponent
  ],
  declarations: [
    ApiAddComponent,
    ApiViewTabsComponent,
    ApiListComponent,
    ApiViewComponent,
    ApiGroupListComponent,
    ApiGroupUserListComponent,
    ApiGroupUserPluginListComponent,

    ApiPluginViewComponent,

    ApiPluginUserListComponent,
    ApiPluginUserViewComponent,

    UserAddComponent,
    UserListComponent,
    UserDetailComponent,
    UserViewComponent,
    UserGroupListComponent,

    UserDataNameListComponent,
    UserDataViewTabsComponent,
    UserDataListComponent,
    UserDataListTabsComponent,
    UserDataViewComponent,

    EndpointViewTabsComponent,
    EndpointListComponent,
    EndpointViewComponent,
    EndpointGroupListComponent,
    EndpointGroupUserListComponent,
    GroupListComponent,
    GroupUserListComponent,
    PluginNameListComponent,
    PluginListComponent,
    ApiPluginListComponent,
    UserPluginListComponent,
    StatusViewComponent,
    ImportExportComponent,
    ImportExportViewComponent
  ],
  providers: [
    AuthService,
    RoleGuard,

    ApiGroupUserService,
    ApiResolver,
    ApiPluginResolver,
    ApiPluginUserResolver,
    ApiService,
    EndpointGroupUserService,
    EndpointResolver,
    EndpointService,
    GroupService,
    GroupUserService,
    PluginService,
    StatusService,
    UserDataService,
    UserGroupService,
    UserResolver,
    UserService,
    ImportExportService,
  ],
  bootstrap: [BcGovTemplateComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fa', 'fa');
  }
}

