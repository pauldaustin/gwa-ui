@Component({
  selector: 'form-group-input',
  template: `<div class="form-group"
    [ngClass]="{'has-error':errorMessage}"> 
      <label class="control-label">{{labelText}}
        <ng-content></ng-content>
      </label>
      <span class="help-block" 
        *ngIf="errorMessage">
        {{errorMessage}}
      </span>
   </div>`,
  directives: [CORE_DIRECTIVES]
})
export class FormGroupInput implements OnChanges {
  @Input()
  labelText:string = '';
  @Input()
  inputErrors:any;
  @Input()
  errorDefs:any;
  
  errorMessage:string = '';
  
  ngOnChanges(changes:any):void {
    var errors:any = changes.inputErrors.currentValue;
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