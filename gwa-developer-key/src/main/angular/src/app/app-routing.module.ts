import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiKeyListComponent } from './ApiKey/ApiKeyListComponent';
import { ApiListComponent } from './Api/ApiListComponent';
import { ApiAuthorizeComponent } from './Api/ApiAuthorizeComponent';

const routes: Routes = [
  { path: '', redirectTo: 'apiKeys', pathMatch: 'full' },
  { path: 'apiKeys',  component: ApiKeyListComponent, pathMatch: 'full' },
  { path: 'apis',  component: ApiListComponent, pathMatch: 'full' },
  { path: 'apis/:appName/authorize',  component: ApiAuthorizeComponent, pathMatch: 'full' },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
