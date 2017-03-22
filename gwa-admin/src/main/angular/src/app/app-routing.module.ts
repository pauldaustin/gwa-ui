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

import { ConsumerAddComponent } from './Consumer/ConsumerAddComponent';
import { ConsumerListComponent } from './Consumer/ConsumerListComponent';
import { ConsumerDetailComponent } from './Consumer/ConsumerDetailComponent';
import { ConsumerViewComponent } from './Consumer/ConsumerViewComponent';
import { ConsumerResolver } from './Consumer/ConsumerResolver';

import { ConsumerGroupListComponent } from './Consumer/Group/ConsumerGroupListComponent';

import { ConsumerPluginListComponent } from './Consumer/Plugin/ConsumerPluginListComponent';

import { EndpointListComponent } from './Endpoint/EndpointListComponent';
import { EndpointDetailComponent } from './Endpoint/EndpointDetailComponent';

import { GroupConsumerListComponent } from './Group/GroupConsumerListComponent';

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
  { path: 'ui/endpoints',  component: EndpointListComponent },
  { path: 'ui/endpoints/:name', component: EndpointDetailComponent },
  { path: 'ui/consumers',  component: ConsumerListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/consumers/_add_',  component: ConsumerAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  {
    path: 'ui/consumers/:username', 
    component: ConsumerDetailComponent, 
    canActivate: [RoleGuard], 
    data: {roles: ['gwa_admin']},
    resolve: { consumer: ConsumerResolver },
    children: [
      { path: '', component: ConsumerViewComponent, pathMatch: 'full' },
      { path: 'groups', component: ConsumerGroupListComponent, pathMatch: 'full' },
      { path: 'plugins', component: ConsumerPluginListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'ui/groups',  component: GroupListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
  { path: 'ui/groups/:groupName',  component: GroupConsumerListComponent, canActivate: [RoleGuard], data: {roles: ['gwa_admin']} },
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
