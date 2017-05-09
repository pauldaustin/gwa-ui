import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '.Component/PageNotFoundComponent';
import { ApiKeyComponent } from './ApiKey/ApiKeyComponent';
//import { ApiListComponent } from './Api/ApiListComponent';
//import { ApiAuthorizeComponent } from './Api/ApiAuthorizeComponent';

const routes: Routes = [
  { path: 'ui', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
  { path: 'ui/apiKeys',  component: ApiKeyComponent, pathMatch: 'full' },
//  { path: 'ui/apis',  component: ApiListComponent, pathMatch: 'full' },
//  { path: 'ui/apis/:appName/authorize',  component: ApiAuthorizeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
]; 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
