import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule }    from '@angular/http';
 
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

import { ApiCreateComponent }  from './Api/ApiCreateComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';
import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }  from './Api/ApiListMyComponent';
import { ApiService }          from './Api/ApiService';

import { ApiKeyListComponent }     from './ApiKey/ApiKeyListComponent';
import { ApiKeyService }           from './ApiKey/ApiKeyService';

import { PluginListComponent }     from './Plugin/PluginListComponent';
import { PluginDetailComponent }   from './Plugin/PluginDetailComponent';
import { PluginAddComponent }      from './Plugin/PluginAddComponent';
import { PluginService }           from './Plugin/PluginService';

import { AppRoutingModule }        from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BcGovTemplateModule.forRoot({
        title: 'Gateway Admin',
        headerMenuItems: [
          {
            title: 'My APIs',
            routerLink: '/apis/my'
          },
          {
            title: 'APIs',
            routerLink: '/apis'
          }
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
    ApiCreateComponent,
    ApiDetailComponent,
    ApiListComponent,
    ApiListMyComponent,
    ApiKeyListComponent,
    PluginListComponent,
    PluginDetailComponent,
    PluginAddComponent
  ],
  providers: [
    ApiService,
    ApiKeyService,
    PluginService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule { }

