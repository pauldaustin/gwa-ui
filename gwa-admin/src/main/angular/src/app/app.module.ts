import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';

import { DeleteDialog } from './Component/DeleteDialog';
import { MessageDialog } from './Component/MessageDialog';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { AuthService } from './Authentication/AuthService';
import { RoleGuard } from './Authentication/RoleGuard';

import { ApiListComponent } from './Api/ApiListComponent';
import { ApiAddComponent } from './Api/ApiAddComponent';
import { ApiDetailComponent } from './Api/ApiDetailComponent';
import { ApiViewComponent } from './Api/ApiViewComponent';
import { ApiService } from './Api/ApiService';
import { ApiResolver } from './Api/ApiResolver';

import { ApiPluginListComponent }     from './Plugin/ApiPluginListComponent';
import { ApiPluginDetailComponent }   from './Plugin/ApiPluginDetailComponent';
import { ApiPluginAddComponent }      from './Plugin/ApiPluginAddComponent';
import { PluginService }           from './Plugin/PluginService';

import { ConsumerListComponent }     from './Consumer/ConsumerListComponent';
import { ConsumerAddComponent }   from './Consumer/ConsumerAddComponent';
import { ConsumerDetailComponent }   from './Consumer/ConsumerDetailComponent';
import { ConsumerViewComponent } from './Consumer/ConsumerViewComponent';
import { ConsumerService }           from './Consumer/ConsumerService';
import { ConsumerResolver } from './Consumer/ConsumerResolver';

import { ConsumerGroupListComponent } from './Consumer/Group/ConsumerGroupListComponent';
import { ConsumerGroupService }           from './Consumer/Group/ConsumerGroupService';

import { EndpointDetailComponent }  from './Endpoint/EndpointDetailComponent';
import { EndpointListComponent }    from './Endpoint/EndpointListComponent';
import { EndpointService }          from './Endpoint/EndpointService';

import { NodeListComponent }     from './Node/NodeListComponent';
import { NodeService }           from './Node/NodeService';

import { StatusDetailComponent }   from './Status/StatusDetailComponent';
import { StatusService }           from './Status/StatusService';

import { AppRoutingModule }        from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    NgxDatatableModule,
    BcGovTemplateModule.forRoot({
        title: 'Gateway Admin',
        headerMenuItems: [
          {
            title: 'Endpoints',
            routerLink: 'ui/endpoints'
          },
          {
            title: 'APIs',
            routerLink: 'ui/apis'
          },
          {
            title: 'Consumers',
            routerLink: 'ui/consumers'
          },
          {
            title: 'Nodes',
            routerLink: 'ui/nodes'
          },
          {
            title: 'Status',
            routerLink: 'ui/status'
          }
        ]
      }
    ),
    AppRoutingModule,
  ],
  entryComponents: [
    MessageDialog,
    DeleteDialog
  ],
  declarations: [
    DeleteDialog,
    MessageDialog,
    PageNotFoundComponent,

    ApiAddComponent,
    ApiDetailComponent,
    ApiListComponent,
    ApiViewComponent,
    ApiPluginListComponent,
    ApiPluginDetailComponent,
    ApiPluginAddComponent,
    ConsumerAddComponent,
    ConsumerListComponent,
    ConsumerDetailComponent,
    ConsumerViewComponent,
    ConsumerGroupListComponent,
    EndpointDetailComponent,
    EndpointListComponent,
    NodeListComponent,
    StatusDetailComponent
  ],
  providers: [
    AuthService,
    RoleGuard,

    ApiService,
    ApiResolver,
    ConsumerService,
    ConsumerResolver,
    ConsumerGroupService,
    EndpointService,
    NodeService,
    PluginService,
    StatusService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule {
}

