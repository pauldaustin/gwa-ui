import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/Component/PageNotFoundComponent';
import { ApiKeyListComponent } from './ApiKey/ApiKeyListComponent';

const routes: Routes = [
  { path: '', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
  { path: 'ui', redirectTo: 'ui/apiKeys', pathMatch: 'full' },
  { path: 'ui/apiKeys', component: ApiKeyListComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
