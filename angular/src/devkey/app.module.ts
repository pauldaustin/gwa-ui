import {NgModule} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdIconRegistry,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdTableModule,
  MdToolbarModule
} from '@angular/material';
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

    CdkTableModule,

    FlexLayoutModule,

    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdTableModule,
    MdToolbarModule,
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
  constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fa', 'fa');
  }
}

