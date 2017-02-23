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

import { ConsumerListComponent }     from './Consumer/ConsumerListComponent';
import { ConsumerCreateComponent }   from './Consumer/ConsumerCreateComponent';
import { ConsumerDetailComponent }   from './Consumer/ConsumerDetailComponent';
import { ConsumerService }           from './Consumer/ConsumerService';

import { NodeListComponent }     from './Node/NodeListComponent';
import { NodeService }           from './Node/NodeService';

import { StatusDetailComponent }   from './Status/StatusDetailComponent';
import { StatusService }           from './Status/StatusService';

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
        title: 'Gateway Admin',
        headerMenuItems: [
          {
            title: 'My APIs',
            routerLink: '/apis/my'
          },
          {
            title: 'APIs',
            routerLink: '/apis'
          },
          {
            title: 'Consumers',
            routerLink: '/consumers'
          },
          {
            title: 'Nodes',
            routerLink: '/nodes'
          },
          {
            title: 'Status',
            routerLink: '/status'
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
    PluginAddComponent,
    ConsumerCreateComponent,
    ConsumerListComponent,
    ConsumerDetailComponent,
    NodeListComponent,
    StatusDetailComponent
  ],
  providers: [
    ApiService,
    ApiKeyService,
    PluginService,
    ConsumerService,
    NodeService,
    StatusService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule { }

