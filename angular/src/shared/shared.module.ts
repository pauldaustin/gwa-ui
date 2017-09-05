import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {
  MdButtonModule,
  MdIconModule,
  MdInputModule
} from '@angular/material';

import {Config} from './Config';
import {BcGovTemplateComponent} from './bcgov-template/BcGovTemplateComponent';
import {AuthService} from './Authentication/auth.service';
import {DeleteDialogComponent} from './Component/DeleteDialogComponent';
import {LoginDialogComponent} from './Component/LoginDialogComponent';
import {MessageDialogComponent} from './Component/MessageDialogComponent';
import {PageNotFoundComponent} from './Component/PageNotFoundComponent';
import {InputFileComponent} from './input-file/input-file-component';

const COMMON_MODULES = [
  PageNotFoundComponent,
  DeleteDialogComponent,
  LoginDialogComponent,
  MessageDialogComponent,
  BcGovTemplateComponent,
  InputFileComponent
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,

    MdButtonModule,
    MdIconModule,
    MdInputModule
  ],
  exports: COMMON_MODULES,
  entryComponents: [
    DeleteDialogComponent,
    LoginDialogComponent,
    MessageDialogComponent
  ],
  declarations: COMMON_MODULES,
  providers: [
    AuthService,
  ],
})
export class SharedModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: Config, useValue: config}
      ]
    };
  }
}
