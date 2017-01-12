import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
 
import {
  AccordionModule,
  ModalModule,
  TabsModule
} from 'ng2-bootstrap/ng2-bootstrap';

import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import { AppComponent }             from './app.component';
import { EndPointCreateComponent }  from './EndPoint/EndPointCreateComponent';
import { EndPointDetailComponent }  from './EndPoint/EndPointDetailComponent';
import { EndPointListComponent }    from './EndPoint/EndPointListComponent';
import { EndPointListMyComponent }  from './EndPoint/EndPointListMyComponent';
import { EndPointService }          from './EndPoint/EndPointService';

import { ApiKeyListComponent }      from './ApiKey/ApiKeyListComponent';

import { AppRoutingModule }         from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AppRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  declarations: [
    AppComponent,
    EndPointCreateComponent,
    EndPointDetailComponent,
    EndPointListComponent,
    EndPointListMyComponent,
    ApiKeyListComponent
  ],
  providers: [ EndPointService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

