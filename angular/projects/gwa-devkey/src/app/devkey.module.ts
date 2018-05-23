import {NgModule} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatIconRegistry,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {RevolsysAngularBcgovPageModule} from 'revolsys-angular-bcgov-page';
import {
  Config,
  RevolsysAngularFrameworkModule
} from 'revolsys-angular-framework';

import {DevKeyRoutingModule} from './devkey-routing.module';

import {ApiService} from './Api/ApiService';
import {DevKeyComponent} from './devkey.component';
import {ApiListComponent} from './Api/ApiListComponent';

import {ApiKeyService} from './ApiKey/api-key.service';
import {ApiKeyListComponent} from './ApiKey/api-key-list.component';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CdkTableModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,

    RevolsysAngularFrameworkModule.forRoot(new Config('API Keys')),

    RevolsysAngularBcgovPageModule.forRoot({
      basePath: '/',
      title: 'API Keys',
      fullWidthContent: true,
      headerMenuItems: [
        {
          title: 'API Keys',
          routerLink: 'ui/apiKeys'
        },
      ]
    }),
    DevKeyRoutingModule
  ],
  entryComponents: [
  ],
  declarations: [
    DevKeyComponent,
    ApiListComponent,
    ApiKeyListComponent,
  ],
  providers: [
    ApiService,
    ApiKeyService,
  ],
  bootstrap: [DevKeyComponent]
})
export class DevKeyModule {
  constructor(mdIconRegistry: MatIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fa', 'fa');
  }
}

