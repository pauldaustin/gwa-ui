import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './Authentication/RoleGuard';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { ApiAddComponent } from './Api/ApiAddComponent';
import { ApiListComponent } from './Api/ApiListComponent';
import { ApiDetailComponent } from './Api/ApiDetailComponent';
import { ApiViewComponent } from './Api/ApiViewComponent';
import { ApiResolver } from './Api/ApiResolver';

import { ApiPluginListComponent } from './Plugin/ApiPluginListComponent';
import { ApiPluginAddComponent } from './Plugin/ApiPluginAddComponent';
import { ApiPluginDetailComponent } from './Plugin/ApiPluginDetailComponent';

import { ConsumerAddComponent } from './Consumer/ConsumerAddComponent';
import { ConsumerListComponent } from './Consumer/ConsumerListComponent';
import { ConsumerDetailComponent } from './Consumer/ConsumerDetailComponent';
import { ConsumerViewComponent } from './Consumer/ConsumerViewComponent';
import { ConsumerResolver } from './Consumer/ConsumerResolver';

import { ConsumerGroupListComponent } from './Consumer/Group/ConsumerGroupListComponent';

import { EndpointListComponent } from './Endpoint/EndpointListComponent';
import { EndpointDetailComponent } from './Endpoint/EndpointDetailComponent';

import { NodeListComponent } from './Node/NodeListComponent';

import { StatusDetailComponent } from './Status/StatusDetailComponent';

const routes: Routes = [
  { path: 'ui', redirectTo: 'ui/endpoints', pathMatch: 'full' },
  { path: 'ui/apis',  component: ApiListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/apis/_add_', component: ApiAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  {
    path: 'ui/apis/:apiName',
    component: ApiDetailComponent,
    canActivate: [RoleGuard],
    data: {roles: ['GWA_ADMIN']},
    resolve: { api: ApiResolver },
    children: [
      { path: '', component: ApiViewComponent, pathMatch: 'full' },
      { path: 'plugins', component: ApiPluginListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'ui/apis/:apiName/plugins/_add_', component: ApiPluginAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/apis/:apiName/plugins/:name', component: ApiPluginDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/endpoints',  component: EndpointListComponent },
  { path: 'ui/endpoints/:name', component: EndpointDetailComponent },
  { path: 'ui/consumers',  component: ConsumerListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/consumers/_add_',  component: ConsumerAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  {
    path: 'ui/consumers/:username', 
    component: ConsumerDetailComponent, 
    canActivate: [RoleGuard], 
    data: {roles: ['GWA_ADMIN']},
    resolve: { consumer: ConsumerResolver },
    children: [
      { path: '', component: ConsumerViewComponent, pathMatch: 'full' },
      { path: 'groups', component: ConsumerGroupListComponent, pathMatch: 'full' },
    ]
  },
  { path: 'ui/nodes',  component: NodeListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/status',  component: StatusDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: '**', component: PageNotFoundComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
