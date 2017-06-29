import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

export class PluginFormField {

  public name: string;

  public fieldType: string;

  public title: string;

  public required = false;

  public readOnly = false;

  public values: any[];

  public control: AbstractControl;

  constructor(field: any, formControl: AbstractControl) {
    this.name = field['name'];
    this.fieldType = field['fieldType'];
    this.title = field['title'];
    this.required = field['required'];
    this.readOnly = field['readOnly'];
    this.values = field['values'];
    this.control = formControl;
  }

  get formGroup(): FormGroup {
    return this.control.parent as FormGroup;
  }

  get formArray(): FormArray {
    return this.control as FormArray;
  }


  formArrayAdd(formArray: FormArray) {
    this.formArray.push(new FormControl(null, Validators.required));
  }

  formArrayRemove(index: number) {
    this.formArray.removeAt(index);
  }
}
