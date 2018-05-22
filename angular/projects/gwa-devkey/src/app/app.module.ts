import {NgModule} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk/table';
import {FlexLayoutModule} from '@angular/flex-layout';
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

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppRoutingModule} from './app-routing.module';
import {RevolsysBcgovAngularPageModule} from 'revolsys-bcgov-angular-page';
import {SharedModule} from '../../../../src/shared/shared.module';

import {ApiService} from './Api/ApiService';
import {AppComponent} from './app.component';
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

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    NgxDatatableModule,

    RevolsysBcgovAngularPageModule.forRoot({
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
    AppComponent,
    ApiListComponent,
    ApiKeyListComponent,
  ],
  providers: [
    ApiService,
    ApiKeyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(mdIconRegistry: MatIconRegistry) {
    mdIconRegistry.registerFontClassAlias('fa', 'fa');
  }
}

