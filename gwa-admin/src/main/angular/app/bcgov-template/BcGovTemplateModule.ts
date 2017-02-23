import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { BcGovTemplate } from './BcGovTemplate';
import { BcGovTemplateConfig } from './BcGovTemplateConfig';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BcGovTemplate],
  exports: [BcGovTemplate]
})
export class BcGovTemplateModule {
  static forRoot(config: BcGovTemplateConfig): ModuleWithProviders {
    return {
      ngModule: BcGovTemplateModule,
      providers: [
        {provide: BcGovTemplateConfig, useValue: config }
      ]
    };
  }
}