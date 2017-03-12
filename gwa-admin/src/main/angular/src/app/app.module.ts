import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {
  BcGovTemplate,
  BcGovTemplateModule
} from './bcgov-template/index';

import { BsFormModule }           from './bs-form/index';

import { DeleteDialog } from './Component/DeleteDialog';
import { MessageDialog } from './Component/MessageDialog';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

import { AuthService } from './Authentication/AuthService';
import { RoleGuard } from './Authentication/RoleGuard';

import { ApiAddComponent }  from './Api/ApiAddComponent';
import { ApiDetailComponent }  from './Api/ApiDetailComponent';
import { ApiListComponent }    from './Api/ApiListComponent';
import { ApiListMyComponent }  from './Api/ApiListMyComponent';
import { ApiService }          from './Api/ApiService';

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
    MaterialModule,
    NgxDatatableModule,
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
    BsFormModule.forRoot()
  ],
  entryComponents: [
    MessageDialog,
    DeleteDialog
  ],
  declarations: [
    ApiAddComponent,
    ApiDetailComponent,
    ApiListComponent,
    ApiListMyComponent,
    ApiPluginListComponent,
    ApiPluginDetailComponent,
    ApiPluginAddComponent,
    ConsumerAddComponent,
    ConsumerListComponent,
    ConsumerDetailComponent,
    DeleteDialog,
    MessageDialog,
    NodeListComponent,
    PageNotFoundComponent,
    StatusDetailComponent
  ],
  providers: [
    AuthService,
    RoleGuard,
    ApiService,
    PluginService,
    ConsumerService,
    NodeService,
    StatusService
  ],
  bootstrap: [ BcGovTemplate ]
})
export class AppModule {
}

