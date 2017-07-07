import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MdButtonModule,MdIconModule } from '@angular/material';

import { Config } from './Config';
import { BcGovTemplateComponent } from './bcgov-template/BcGovTemplateComponent';
import { AuthService } from './Authentication/AuthService';
import { DeleteDialogComponent } from './Component/DeleteDialogComponent';
import { MessageDialogComponent } from './Component/MessageDialogComponent';
import { PageNotFoundComponent } from './Component/PageNotFoundComponent';

const COMMON_MODULES = [
    PageNotFoundComponent,
    DeleteDialogComponent,
    MessageDialogComponent,
    BcGovTemplateComponent
]

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,

    MdButtonModule,
    MdIconModule,
  ],
  exports: COMMON_MODULES,
  entryComponents: [
    DeleteDialogComponent,
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
        { provide: Config, useValue: config }
      ]
    };
  }
}

