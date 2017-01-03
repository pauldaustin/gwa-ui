import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }             from './app.component';
import { EndPointDetailComponent }  from './endPoint/EndPointDetailComponent';
import { EndPointListComponent }    from './endPoint/EndPointListComponent';
import { EndPointService }          from './endPoint/EndPointService';

import { AppRoutingModule }         from './app-routing.module';
 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    EndPointDetailComponent,
    EndPointListComponent
  ],
  providers: [ EndPointService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

