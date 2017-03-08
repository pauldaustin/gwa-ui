import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { HttpModule }    from '@angular/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AccordionModule } from 'ng2-bootstrap/accordion';

import { ModalModule } from 'ng2-bootstrap/modal';

import { TabsModule } from 'ng2-bootstrap/tabs';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';

import { BsFormModule }           from './bs-form/index';

import { MessageDialog }           from './Component/MessageDialog';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { AuthService } from './Authentication/AuthService';
import { RoleGuard } from './Authentication/RoleGuard';

import { ApiAddComponent }  from './Api/ApiAddComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';
import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }  from './Api/ApiListMyComponent';
import { ApiService }          from './Api/ApiService';

import { ApiKeyListComponent }     from './ApiKey/ApiKeyListComponent';
import { ApiKeyService }           from './ApiKey/ApiKeyService';

import { ApiPluginListComponent }     from './Plugin/ApiPluginListComponent';
import { ApiPluginDetailComponent }   from './Plugin/ApiPluginDetailComponent';
import { ApiPluginAddComponent }      from './Plugin/ApiPluginAddComponent';
import { PluginService }           from './Plugin/PluginService';

import { ConsumerListComponent }     from './Consumer/ConsumerListComponent';
import { ConsumerAddComponent }   from './Consumer/ConsumerAddComponent';
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
    BootstrapModalModule,
    BcGovTemplateModule.forRoot({
        title: 'Gateway Admin',
        headerMenuItems: [
          {
            title: 'My APIs',
            routerLink: 'app/apis/my'
          },
          {
            title: 'APIs',
            routerLink: 'app/apis'
          },
          {
            title: 'Consumers',
            routerLink: 'app/consumers'
          },
          {
            title: 'Nodes',
            routerLink: 'app/nodes'
          },
          {
            title: 'Status',
            routerLink: 'app/status'
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
  entryComponents: [
    MessageDialog
  ],
  declarations: [
    ApiAddComponent,
    ApiDetailComponent,
    ApiListComponent,
    ApiListMyComponent,
    ApiKeyListComponent,
    ApiPluginListComponent,
    ApiPluginDetailComponent,
    ApiPluginAddComponent,
    ConsumerAddComponent,
    ConsumerListComponent,
    ConsumerDetailComponent,
    MessageDialog,
    NodeListComponent,
    PageNotFoundComponent,
    StatusDetailComponent
  ],
  providers: [
    AuthService,
    RoleGuard,
    ApiService,
    ApiKeyService,
    PluginService,
    ConsumerService,
    NodeService,
    StatusService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule {
}

