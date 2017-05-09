import { NgModule }       from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserModule }  from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './Authentication/AuthService';
import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';
import { DeleteDialog } from '.Component/DeleteDialog';
import { MessageDialog } from '.Component/MessageDialog';
import { PageNotFoundComponent } from '.Component/PageNotFoundComponent';
import { ApiKeyService } from './ApiKey/ApiKeyService';
import { ApiKeyComponent } from './ApiKey/ApiKeyComponent';
//import { ApiService } from './Api/ApiService';
//import { ApiListComponent } from './Api/ApiListComponent';
//import { ApiAuthorizeComponent } from './Api/ApiAuthorizeComponent';

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
//          {
//            title: 'APIs',
//            routerLink: 'ui/apis'
//          },
        ]
      }
    ),
    AppRoutingModule,
  ],
  entryComponents: [
    DeleteDialog,
    MessageDialog
  ],
  declarations: [
    ApiKeyComponent,
//    ApiListComponent,
//    ApiAuthorizeComponent,
    PageNotFoundComponent,
    DeleteDialog,
    MessageDialog
  ],
  providers: [
    AuthService,
    ApiKeyService,
//    ApiService,
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule { }

