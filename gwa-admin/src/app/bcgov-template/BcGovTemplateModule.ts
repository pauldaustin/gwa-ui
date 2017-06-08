import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdIconModule } from '@angular/material';

import { BcGovTemplateComponent } from './BcGovTemplateComponent';
import { BcGovTemplateConfig } from './BcGovTemplateConfig';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdIconModule
  ],
  declarations: [BcGovTemplateComponent],
  exports: [BcGovTemplateComponent]
})
export class BcGovTemplateModule {
  static forRoot(config: BcGovTemplateConfig): ModuleWithProviders {
    return {
      ngModule: BcGovTemplateModule,
      providers: [
        { provide: BcGovTemplateConfig, useValue: config }
      ]
    };
  }
}
