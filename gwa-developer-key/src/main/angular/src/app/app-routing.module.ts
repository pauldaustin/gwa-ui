import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeyListComponent }   from './ApiKey/ApiKeyListComponent';

import { ApplicationListComponent }    from './Application/ApplicationListComponent';

const routes: Routes = [
  { path: '', redirectTo: 'apiKeys', pathMatch: 'full' },
  { path: 'apiKeys',  component: ApiKeyListComponent, pathMatch: 'full' },
  { path: 'apps',  component: ApplicationListComponent, pathMatch: 'full' },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
