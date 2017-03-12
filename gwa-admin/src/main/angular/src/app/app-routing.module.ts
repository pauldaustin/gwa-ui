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
  { path: 'app', redirectTo: 'app/apis/my', pathMatch: 'full' },
  { path: 'app/apis/my',  component: ApiListMyComponent, pathMatch: 'full' },
  { path: 'app/apis',  component: ApiListComponent },
  { path: 'app/apis/_add_', component: ApiAddComponent, pathMatch: 'full' },
  { path: 'app/apis/:name', component: ApiDetailComponent },
  { path: 'app/apis/:apiName/plugins/_add_', component: ApiPluginAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/apis/:apiName/plugins/:name', component: ApiPluginDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/consumers',  component: ConsumerListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/consumers/_add_',  component: ConsumerAddComponent, pathMatch: 'full', canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/consumers/:username', component: ConsumerDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/nodes',  component: NodeListComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: 'app/status',  component: StatusDetailComponent, canActivate: [RoleGuard], data: {roles: ['GWA_ADMIN']} },
  { path: '**', component: PageNotFoundComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
