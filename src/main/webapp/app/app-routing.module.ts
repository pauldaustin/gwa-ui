import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EndPointListComponent }    from './endPoint/EndPointListComponent';
import { EndPointDetailComponent }  from './endPoint/EndPointDetailComponent';

const routes: Routes = [
  { path: '', redirectTo: '/endPoints', pathMatch: 'full' },
  { path: 'endPoints',  component: EndPointListComponent },
  { path: 'endPoints/:id', component: EndPointDetailComponent }
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
