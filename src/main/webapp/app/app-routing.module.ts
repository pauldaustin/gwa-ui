import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EndPointListComponent }    from './EndPoint/EndPointListComponent';
import { EndPointListMyComponent }    from './EndPoint/EndPointListMyComponent';
import { EndPointDetailComponent }  from './EndPoint/EndPointDetailComponent';

const routes: Routes = [
  { path: '', redirectTo: '/endPoints/my', pathMatch: 'full' },
  { path: 'endPoints/my',  component: EndPointListMyComponent, pathMatch: 'full' },
  { path: 'endPoints',  component: EndPointListComponent },
  { path: 'endPoints/:id', component: EndPointDetailComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
