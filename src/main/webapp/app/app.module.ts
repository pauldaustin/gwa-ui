import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
 
import { AppComponent }             from './app.component';
import { EndPointDetailComponent }  from './EndPoint/EndPointDetailComponent';
import { EndPointListComponent }    from './EndPoint/EndPointListComponent';
import { EndPointListMyComponent }  from './EndPoint/EndPointListMyComponent';
import { EndPointService }          from './EndPoint/EndPointService';

import { AppRoutingModule }         from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EndPointDetailComponent,
    EndPointListComponent,
    EndPointListMyComponent
  ],
  providers: [ EndPointService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

