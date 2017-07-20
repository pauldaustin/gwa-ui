import {NgModule} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppRoutingModule} from './app-routing.module';
import {BcGovTemplateComponent} from '../shared/bcgov-template/BcGovTemplateComponent';
import {SharedModule} from '../shared/shared.module';

import {ApiService} from './Api/ApiService';
import {ApiListComponent} from './Api/ApiListComponent';

import {ApiKeyService} from './ApiKey/ApiKeyService';
import {ApiKeyListComponent} from './ApiKey/ApiKeyListComponent';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    NgxDatatableModule,
    SharedModule.forRoot({
      basePath: '',
      title: 'API Keys',
      headerMenuItems: [
        {
          title: 'API Keys',
          routerLink: 'ui/apiKeys'
        },
      ]
    }
    ),
    AppRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    ApiListComponent,
    ApiKeyListComponent,
  ],
  providers: [
    ApiService,
    ApiKeyService,
  ],
  bootstrap: [BcGovTemplateComponent]
})
export class AppModule {
}

