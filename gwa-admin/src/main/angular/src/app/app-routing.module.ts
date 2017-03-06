import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }    from './Api/ApiListMyComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';
import { PluginDetailComponent }  from './Plugin/PluginDetailComponent';

import { ConsumerCreateComponent }    from './Consumer/ConsumerCreateComponent';
import { ConsumerListComponent }    from './Consumer/ConsumerListComponent';
import { ConsumerDetailComponent }  from './Consumer/ConsumerDetailComponent';

import { NodeListComponent }    from './Node/NodeListComponent';

import { StatusDetailComponent }   from './Status/StatusDetailComponent';

const routes: Routes = [
  { path: '', redirectTo: 'apis/my', pathMatch: 'full' },
  { path: 'apis/my',  component: ApiListMyComponent, pathMatch: 'full' },
  { path: 'apis',  component: ApiListComponent },
  { path: 'apis/:id', component: ApiDetailComponent },
  { path: 'apis/:api_id/plugins/:name', component: PluginDetailComponent },
  { path: 'consumers',  component: ConsumerListComponent },
  { path: 'consumers/_new_',  component: ConsumerCreateComponent },
  { path: 'consumers/:id', component: ConsumerDetailComponent },
  { path: 'nodes',  component: NodeListComponent },
  { path: 'status',  component: StatusDetailComponent },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
