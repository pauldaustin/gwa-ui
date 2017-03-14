import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './Authentication/RoleGuard';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';
import { ApiAddComponent } from './Api/ApiAddComponent';
import { ApiListComponent } from './Api/ApiListComponent';
import { ApiListMyComponent } from './Api/ApiListMyComponent';
import { ApiDetailComponent } from './Api/ApiDetailComponent';

import { ApiPluginAddComponent } from './Plugin/ApiPluginAddComponent';
import { ApiPluginDetailComponent } from './Plugin/ApiPluginDetailComponent';

import { ConsumerAddComponent } from './Consumer/ConsumerAddComponent';
import { ConsumerListComponent } from './Consumer/ConsumerListComponent';
import { ConsumerDetailComponent } from './Consumer/ConsumerDetailComponent';

import { NodeListComponent } from './Node/NodeListComponent';

import { StatusDetailComponent } from './Status/StatusDetailComponent';

const routes: Routes = [
  { path: 'ui', redirectTo: 'ui/apis', pathMatch: 'full' },
  { path: 'ui/apis/my',  component: ApiListMyComponent, pathMatch: 'full' },
  { path: 'ui/apis',  component: ApiListComponent },
  { path: 'ui/apis/_add_', component: ApiAddComponent, pathMatch: 'full' },
  { path: 'ui/apis/:name', component: ApiDetailComponent },
  { path: 'ui/apis/:apiName/plugins/_add_', component: ApiPluginAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/apis/:apiName/plugins/:name', component: ApiPluginDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/consumers',  component: ConsumerListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/consumers/_add_',  component: ConsumerAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'ui/consumers/:username', component: ConsumerDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
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
