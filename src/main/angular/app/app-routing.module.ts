import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }    from './Api/ApiListMyComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';
import { PluginDetailComponent }  from './Plugin/PluginDetailComponent';

const routes: Routes = [
  { path: '', redirectTo: 'apis/my', pathMatch: 'full' },
  { path: 'apis/my',  component: ApiListMyComponent, pathMatch: 'full' },
  { path: 'apis',  component: ApiListComponent },
  { path: 'apis/:id', component: ApiDetailComponent },
  { path: 'apis/:api_id/plugins/:name', component: PluginDetailComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
