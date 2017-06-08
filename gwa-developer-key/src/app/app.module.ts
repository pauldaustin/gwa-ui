import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './Authentication/AuthService';
import {
  BcGovTemplateComponent,
  BcGovTemplateModule
} from './bcgov-template/index';
import { DeleteDialogComponent } from './Component/DeleteDialogComponent';
import { MessageDialogComponent } from './Component/MessageDialogComponent';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';
import { ApiKeyService } from './ApiKey/ApiKeyService';
import { ApiKeyComponent } from './ApiKey/ApiKeyComponent';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    NgxDatatableModule,
    BcGovTemplateModule.forRoot({
      title: 'API Keys',
      headerMenuItems: [
        {
          title: 'API Keys',
          routerLink: 'ui/apiKeys'
        },
      ]
    }
    ),
    AppRoutingModule,
  ],
  entryComponents: [
    DeleteDialogComponent,
    MessageDialogComponent
  ],
  declarations: [
    ApiKeyComponent,
    PageNotFoundComponent,
    DeleteDialogComponent,
    MessageDialogComponent
  ],
  providers: [
    AuthService,
    ApiKeyService,
  ],
  bootstrap: [BcGovTemplateComponent]
})
export class AppModule {
}

