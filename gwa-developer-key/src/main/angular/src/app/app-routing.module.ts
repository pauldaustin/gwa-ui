import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiKeyListComponent } from './ApiKey/ApiKeyListComponent';
import { ApiListComponent } from './Api/ApiListComponent';
import { ApiAuthorizeComponent } from './Api/ApiAuthorizeComponent';

const routes: Routes = [
  { path: 'app', redirectTo: 'app/apiKeys', pathMatch: 'full' },
  { path: 'app/apiKeys',  component: ApiKeyListComponent, pathMatch: 'full' },
  { path: 'app/apis',  component: ApiListComponent, pathMatch: 'full' },
  { path: 'app/apis/:appName/authorize',  component: ApiAuthorizeComponent, pathMatch: 'full' },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
