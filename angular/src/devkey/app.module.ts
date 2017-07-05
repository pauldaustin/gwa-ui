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
import { BcGovTemplateComponent } from '../shared/bcgov-template/BcGovTemplateComponent';
import { SharedModule } from '../shared/shared.module';
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
    ApiKeyComponent,
  ],
  providers: [
    ApiKeyService,
  ],
  bootstrap: [BcGovTemplateComponent]
})
export class AppModule {
}

