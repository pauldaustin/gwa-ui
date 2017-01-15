import {
  Component,
  Input,
  OnChanges,
  AfterViewChecked,
  SimpleChanges
} from '@angular/core';

import {
  AbstractControl,
  NgForm,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'bs-form-group',
  template: `
<div class="form-group"
  [ngClass]="{
    'has-error': control && !control.valid,
    'has-success': control && control.valid
  }"
> 
  <label *ngIf="title" for="{{name}}" class="{{labelWidth}} control-label">{{title}}</label>
  <div class="{{inputWidth}}">
    <ng-content></ng-content>
  </div>
</div>`
}) 
export class BsFormGroup implements OnChanges, AfterViewChecked {
  @Input() labelWidth: string = "col-sm-2";

  @Input() inputWidth: string = "col-sm-10";
  
  @Input() style: string;
  
  @Input() title: string; 
  
  @Input() name: string;
  
  @Input() errorDefs: any = {};
  
  formGroup: FormGroup;

  errorMessage: string = '';
  
  @Input() form: NgForm;
  
  control: AbstractControl;
 
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if ('form' == propName) {
        this.formGroup = this.form.form;
      }
    }
  }
  
  ngAfterViewChecked() {
    if (this.formGroup) {
      this.control = this.formGroup.controls[this.name];
    }
  }
}
