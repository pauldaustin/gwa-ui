import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './Authentication/RoleGuard';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { ApiAddComponent } from './Api/ApiAddComponent';
import { ApiListComponent } from './Api/ApiListComponent';
import { ApiDetailComponent } from './Api/ApiDetailComponent';
import { ApiViewComponent } from './Api/ApiViewComponent';
import { ApiResolver } from './Api/ApiResolver';

import { ApiPluginListComponent } from './Api/Plugin/ApiPluginListComponent';
import { ApiPluginAddComponent } from './Api/Plugin/ApiPluginAddComponent';
import { ApiPluginDetailComponent } from './Api/Plugin/ApiPluginDetailComponent';

import { UserAddComponent } from './User/UserAddComponent';
import { UserListComponent } from './User/UserListComponent';
import { UserDetailComponent } from './User/UserDetailComponent';
import { UserViewComponent } from './User/UserViewComponent';
import { UserResolver } from './User/UserResolver';

import { UserGroupListComponent } from './User/Group/UserGroupListComponent';

import { UserPluginListComponent } from './User/Plugin/UserPluginListComponent';

import { EndpointListComponent } from './Endpoint/EndpointListComponent';
import { EndpointDetailComponent } from './Endpoint/EndpointDetailComponent';
import { EndpointResolver } from './Endpoint/EndpointResolver';
import { EndpointViewComponent } from './Endpoint/EndpointViewComponent';

import { EndpointGroupListComponent } from './Endpoint/Group/EndpointGroupListComponent';
import { EndpointGroupUserListComponent } from './Endpoint/Group/EndpointGroupUserListComponent';

import { GroupUserListComponent } from './Group/GroupUserListComponent';

import { GroupListComponent } from './Group/GroupListComponent';

import { NodeListComponent } from './Node/NodeListComponent';

import { PluginNameListComponent } from './Plugin/PluginNameListComponent';
import { PluginListComponent } from './Plugin/PluginListComponent';

import { StatusDetailComponent } from './Status/StatusDetailComponent';

const routes: Routes = [
  { path: 'ui', redirectTo: 'ui/endpoints', pathMatch: 'full' },

  { path: 'ui/apis',  component: ApiListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/apis/_add_', component: ApiAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  {
    path: 'ui/apis/:apiName',
    component: ApiDetailComponent,
    canActivate: [RoleGuard],
    data: {roles: ['gwa_admin']},
    resolve: { api: ApiResolver },
    children: [
      { path: '', component: ApiViewComponent, pathMatch: 'full' },
      { path: 'plugins', component: ApiPluginListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'ui/apis/:apiName/plugins/_add_', component: ApiPluginAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/apis/:apiName/plugins/:name', component: ApiPluginDetailComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },

  
  { path: 'ui/users',  component: UserListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/users/_add_',  component: UserAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  {
    path: 'ui/users/:username', 
    component: UserDetailComponent, 
    canActivate: [RoleGuard], 
    data: {roles: ['gwa_admin']},
    resolve: { user: UserResolver },
    children: [
      { path: '', component: UserViewComponent, pathMatch: 'full' },
      { path: 'groups', component: UserGroupListComponent, pathMatch: 'full' },
      { path: 'plugins', component: UserPluginListComponent, pathMatch: 'full' },
    ]
  },

  { path: 'ui/endpoints',  component: EndpointListComponent },
  {
    path: 'ui/endpoints/:apiName', 
    component: EndpointDetailComponent, 
    resolve: { api: EndpointResolver },
    children: [
      { path: '', component: EndpointViewComponent, pathMatch: 'full' },
      { path: 'groups', component: EndpointGroupListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'ui/endpoints/:apiName/groups/:groupName',  component: EndpointGroupUserListComponent },

  { path: 'ui/groups',  component: GroupListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/groups/:groupName',  component: GroupUserListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },

  { path: 'ui/nodes',  component: NodeListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },

  { path: 'ui/plugins',  component: PluginNameListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/plugins/:pluginName',  component: PluginListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },

  { path: 'ui/status',  component: StatusDetailComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: '**', component: PageNotFoundComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
