import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthorize }   from './Authentication/AdminAuthorize';
import { UserAuthorize }   from './Authentication/UserAuthorize';
import { ApiAddComponent }  from './Api/ApiAddComponent';
import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }    from './Api/ApiListMyComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';

import { ApiPluginAddComponent }  from './Plugin/ApiPluginAddComponent';
import { ApiPluginDetailComponent }  from './Plugin/ApiPluginDetailComponent';

import { ConsumerAddComponent }    from './Consumer/ConsumerAddComponent';
import { ConsumerListComponent }    from './Consumer/ConsumerListComponent';
import { ConsumerDetailComponent }  from './Consumer/ConsumerDetailComponent';

import { NodeListComponent }    from './Node/NodeListComponent';

import { StatusDetailComponent }   from './Status/StatusDetailComponent';

const routes: Routes = [
  { path: '', redirectTo: 'apis/my', pathMatch: 'full' },
  { path: 'apis/my',  component: ApiListMyComponent, pathMatch: 'full', canActivate: [UserAuthorize] },
  { path: 'apis',  component: ApiListComponent, canActivate: [UserAuthorize] },
  { path: 'apis/_add_', component: ApiAddComponent, pathMatch: 'full', canActivate: [UserAuthorize] },
  { path: 'apis/:name', component: ApiDetailComponent, canActivate: [UserAuthorize] },
  { path: 'apis/:apiName/plugins/_add_', component: ApiPluginAddComponent, pathMatch: 'full', canActivate: [AdminAuthorize] },
  { path: 'apis/:apiName/plugins/:name', component: ApiPluginDetailComponent, canActivate: [AdminAuthorize] },
  { path: 'consumers',  component: ConsumerListComponent, canActivate: [AdminAuthorize] },
  { path: 'consumers/_add_',  component: ConsumerAddComponent, pathMatch: 'full', canActivate: [AdminAuthorize] },
  { path: 'consumers/:id', component: ConsumerDetailComponent, canActivate: [AdminAuthorize] },
  { path: 'nodes',  component: NodeListComponent, canActivate: [AdminAuthorize] },
  { path: 'status',  component: StatusDetailComponent, canActivate: [AdminAuthorize] },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
