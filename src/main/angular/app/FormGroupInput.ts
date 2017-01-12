import {
  Component,
  Input,
    OnChanges
} from '@angular/core';

import {
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'form-group-input',
  template: `<div class="form-group"
    [ngClass]="{'has-error':errorMessage}"> 
      <label for="{{name}}" class="col-sm-2 control-label">{{title}}</label>
      <div class="col-sm-10">
        <ng-content></ng-content>
        <span class="help-block" 
          *ngIf="errorMessage">
          {{errorMessage}}
        </span>
     </div>
   </div>`
})
export class FormGroupInput implements OnChanges {
  @Input() title: string = '';
  
  @Input() name: string;
   
  @Input() form: FormGroup;
  
  @Input() errorDefs: any = {};
  
  errorMessage: string = '';
  
  get control(): FormControl {
    if (this.form && this.name) {
      return this.form[this.name];
    }
    return null;
  }
  
  ngOnChanges(changes:any):void {
    if (changes.control) {
      var errors:any = changes.control.errors.currentValue;
      this.errorMessage = '';
      if (errors) {
        Object.keys(this.errorDefs).some(key => {
          if (errors[key]) {
            this.errorMessage = this.errorDefs[key];
            return true;
          }
        });
      }
    }
  }
}
