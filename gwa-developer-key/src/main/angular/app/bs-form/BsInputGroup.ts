import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'bs-input-group',
  template: `
<div class="input-group">
  <span *ngIf="prefixIcon" class="input-group-addon"><i class="fa fa-{{prefixIcon}} fa-fw"></i></span>
  <span *ngIf="prefixText" class="input-group-addon">{{prefixText}}</span>
  <ng-content></ng-content>
  <span *ngIf="suffixIcon" class="input-group-addon"><i class="fa fa-{{suffixIcon}} fa-fw"></i></span>
  <span *ngIf="suffixText" class="input-group-addon">{{suffixText}}</span>
</div>`
}) 
export class BsInputGroup {
  @Input() prefixIcon: string;
  
  @Input() prefixText: string;
  
  @Input() suffixIcon: string;
  
  @Input() suffixText: string;
}
