import { AbstractControl } from '@angular/forms';

import { PluginFormField } from './PluginFormField';

export class PluginFormGroup {
  public rows = new Array<Array<PluginFormField>>();

  constructor(
    public formGroupName: string,
    public title: string,
  ) {
  }

  public addField(field: any, formControl: AbstractControl): PluginFormGroup {
    const formField = new PluginFormField(field, formControl);
    this.rows.push([formField]);
    return this;
  }

  public addRow(fields: PluginFormField[]) {
    this.rows.push(fields);
    return this;
  }
}
