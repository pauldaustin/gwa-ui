import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../Component/PageNotFoundComponent';
import { ApiKeyComponent } from './ApiKey/ApiKeyComponent';

const routes: Routes = [
  { path: '', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
  { path: 'ui', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
  { path: 'ui/apiKeys', component: ApiKeyComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
