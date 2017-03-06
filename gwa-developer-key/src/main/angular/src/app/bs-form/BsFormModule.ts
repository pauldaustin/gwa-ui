import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { BsFormGroup } from './BsFormGroup';

import { BsInputGroup } from './BsInputGroup';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BsFormGroup,
    BsInputGroup
  ],
  exports: [
    BsFormGroup,
    BsInputGroup
  ]
})
export class BsFormModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BsFormModule
    };
  }
}