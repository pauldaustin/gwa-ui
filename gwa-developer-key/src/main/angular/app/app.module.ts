import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule }    from '@angular/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  AccordionModule,
  ModalModule,
  TabsModule
} from 'ng2-bootstrap/ng2-bootstrap';

import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';

import { BsFormModule }           from './bs-form/index';

import { ApiKeyListComponent }     from './ApiKey/ApiKeyListComponent';
import { ApiKeyService }           from './ApiKey/ApiKeyService';

import { ApplicationListComponent }      from './Application/ApplicationListComponent';
import { ApplicationService }            from './Application/ApplicationService';

import { AppRoutingModule }        from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxDatatableModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BcGovTemplateModule.forRoot({
        title: 'GW Dev Keys',
        headerMenuItems: [
          {
            title: 'API Keys',
            routerLink: '/apiKeys'
          },
          {
            title: 'Apps',
            routerLink: '/apps'
          },
        ]
      }
    ),
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    BsFormModule.forRoot()
  ],
  declarations: [
    ApiKeyListComponent,
    ApplicationListComponent,
  ],
  providers: [
    ApiKeyService,
    ApplicationService,
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule { }

