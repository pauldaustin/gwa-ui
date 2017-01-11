/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
 /* tslint:disable */

import * as import0 from './EndPointListMyComponent';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/render/api';
import * as import3 from '@angular/core/src/linker/view_utils';
import * as import4 from '@angular/core/src/metadata/view';
import * as import5 from '@angular/core/src/linker/view_type';
import * as import6 from '@angular/core/src/change_detection/constants';
import * as import7 from '@angular/core/src/linker/component_factory';
import * as import8 from '@angular/router/src/router';
import * as import9 from './EndPointService';
import * as import10 from '@angular/core/src/linker/view_container';
import * as import11 from '../../node_modules/@angular/router/src/directives/router_link.ngfactory';
import * as import12 from '../../node_modules/@angular/common/src/directives/ng_switch.ngfactory';
import * as import13 from '../../node_modules/angular-confirmation-popover/dist/esm/src/confirmationPopover.directive.ngfactory';
import * as import14 from '@angular/core/src/change_detection/change_detection_util';
import * as import15 from '@angular/router/src/router_state';
import * as import16 from '@angular/common/src/location/location_strategy';
import * as import17 from '@angular/core/src/linker/template_ref';
import * as import18 from '@angular/core/src/linker/element_ref';
import * as import19 from 'angular-confirmation-popover/dist/esm/src/confirmationPopoverOptions.provider';
import * as import20 from '@angular/core/src/linker/component_factory_resolver';
import * as import21 from 'positioning/dist/umd/src/positioning';
import * as import22 from '@angular/platform-browser/src/dom/dom_tokens';
import * as import23 from '@angular/router/src/directives/router_link';
import * as import24 from '@angular/common/src/directives/ng_switch';
import * as import25 from 'angular-confirmation-popover/dist/esm/src/confirmationPopover.directive';
import * as import26 from '../../node_modules/@angular/common/src/directives/ng_for.ngfactory';
import * as import27 from '@angular/core/src/change_detection/differs/iterable_differs';
import * as import28 from '@angular/common/src/directives/ng_for';
export class Wrapper_EndPointListMyComponent {
  /*private*/ _eventHandler:Function;
  context:import0.EndPointListMyComponent;
  /*private*/ _changed:boolean;
  constructor(p0:any,p1:any) {
    this._changed = false;
    this.context = new import0.EndPointListMyComponent(p0,p1);
  }
  ngOnDetach(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any):void {
  }
  ngOnDestroy():void {
  }
  ngDoCheck(view:import1.AppView<any>,el:any,throwOnChange:boolean):boolean {
    var changed:any = this._changed;
    this._changed = false;
    if (!throwOnChange) { if ((view.numberOfChecks === 0)) { this.context.ngOnInit(); } }
    return changed;
  }
  checkHost(view:import1.AppView<any>,componentView:import1.AppView<any>,el:any,throwOnChange:boolean):void {
  }
  handleEvent(eventName:string,$event:any):boolean {
    var result:boolean = true;
    return result;
  }
  subscribe(view:import1.AppView<any>,_eventHandler:any):void {
    this._eventHandler = _eventHandler;
  }
}
var renderType_EndPointListMyComponent_Host:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,([] as any[]),{});
class View_EndPointListMyComponent_Host0 extends import1.AppView<any> {
  _el_0:any;
  compView_0:import1.AppView<import0.EndPointListMyComponent>;
  _EndPointListMyComponent_0_3:Wrapper_EndPointListMyComponent;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EndPointListMyComponent_Host0,renderType_EndPointListMyComponent_Host,import5.ViewType.HOST,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.selectOrCreateRenderHostElement(this.renderer,'endPoint-list',import3.EMPTY_INLINE_ARRAY,rootSelector,(null as any));
    this.compView_0 = new View_EndPointListMyComponent0(this.viewUtils,this,0,this._el_0);
    this._EndPointListMyComponent_0_3 = new Wrapper_EndPointListMyComponent(this.injectorGet(import8.Router,this.parentIndex),this.injectorGet(import9.EndPointService,this.parentIndex));
    this.compView_0.create(this._EndPointListMyComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return new import7.ComponentRef_<any>(0,this,this._el_0,this._EndPointListMyComponent_0_3.context);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import0.EndPointListMyComponent) && (0 === requestNodeIndex))) { return this._EndPointListMyComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    this._EndPointListMyComponent_0_3.ngDoCheck(this,this._el_0,throwOnChange);
    this.compView_0.internalDetectChanges(throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
export const EndPointListMyComponentNgFactory:import7.ComponentFactory<import0.EndPointListMyComponent> = new import7.ComponentFactory<import0.EndPointListMyComponent>('endPoint-list',View_EndPointListMyComponent_Host0,import0.EndPointListMyComponent);
const styles_EndPointListMyComponent:any[] = ([] as any[]);
class View_EndPointListMyComponent2 extends import1.AppView<any> {
  _el_0:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_EndPointListMyComponent2,renderType_EndPointListMyComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray8(6,'class','fa fa-check','style','color:green','title','Enabled'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_EndPointListMyComponent3 extends import1.AppView<any> {
  _el_0:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_EndPointListMyComponent3,renderType_EndPointListMyComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'span',new import3.InlineArray8(6,'class','fa fa-times','style','color:red','title','Disabled'),(null as any));
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_EndPointListMyComponent1 extends import1.AppView<any> {
  _el_0:any;
  _text_1:any;
  _el_2:any;
  _el_3:any;
  _RouterLinkWithHref_3_3:import11.Wrapper_RouterLinkWithHref;
  _text_4:any;
  _text_5:any;
  _el_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _text_11:any;
  _el_12:any;
  _NgSwitch_12_3:import12.Wrapper_NgSwitch;
  _text_13:any;
  _anchor_14:any;
  /*private*/ _vc_14:import10.ViewContainer;
  _TemplateRef_14_5:any;
  _NgSwitchCase_14_6:import12.Wrapper_NgSwitchCase;
  _text_15:any;
  _anchor_16:any;
  /*private*/ _vc_16:import10.ViewContainer;
  _TemplateRef_16_5:any;
  _NgSwitchDefault_16_6:import12.Wrapper_NgSwitchDefault;
  _text_17:any;
  _text_18:any;
  _el_19:any;
  _text_20:any;
  _el_21:any;
  /*private*/ _vc_21:import10.ViewContainer;
  _ConfirmationPopover_21_5:import13.Wrapper_ConfirmationPopover;
  _text_22:any;
  _el_23:any;
  _text_24:any;
  _el_25:any;
  _text_26:any;
  _text_27:any;
  _text_28:any;
  _text_29:any;
  /*private*/ _expr_40:any;
  _arr_41:any;
  /*private*/ _expr_42:any;
  /*private*/ _expr_43:any;
  /*private*/ _expr_44:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import10.ViewContainer) {
    super(View_EndPointListMyComponent1,renderType_EndPointListMyComponent,import5.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways,declaredViewContainer);
    this._expr_40 = import14.UNINITIALIZED;
    this._arr_41 = import3.pureProxy2((p0:any,p1:any):any[] => {
      return [
        p0,
        p1
      ]
      ;
    });
    this._expr_42 = import14.UNINITIALIZED;
    this._expr_43 = import14.UNINITIALIZED;
    this._expr_44 = import14.UNINITIALIZED;
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    this._el_0 = import3.createRenderElement(this.renderer,(null as any),'tr',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_1 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_2 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_2,'a',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._RouterLinkWithHref_3_3 = new import11.Wrapper_RouterLinkWithHref(this.parentView.parentView.injectorGet(import8.Router,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import15.ActivatedRoute,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import16.LocationStrategy,this.parentView.parentIndex));
    this._text_4 = this.renderer.createText(this._el_3,'',(null as any));
    this._text_5 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_6 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_7 = this.renderer.createText(this._el_6,'',(null as any));
    this._text_8 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'',(null as any));
    this._text_11 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_12 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._NgSwitch_12_3 = new import12.Wrapper_NgSwitch();
    this._text_13 = this.renderer.createText(this._el_12,'\n          ',(null as any));
    this._anchor_14 = this.renderer.createTemplateAnchor(this._el_12,(null as any));
    this._vc_14 = new import10.ViewContainer(14,12,this,this._anchor_14);
    this._TemplateRef_14_5 = new import17.TemplateRef_(this,14,this._anchor_14);
    this._NgSwitchCase_14_6 = new import12.Wrapper_NgSwitchCase(this._vc_14.vcRef,this._TemplateRef_14_5,this._NgSwitch_12_3.context);
    this._text_15 = this.renderer.createText(this._el_12,'\n          ',(null as any));
    this._anchor_16 = this.renderer.createTemplateAnchor(this._el_12,(null as any));
    this._vc_16 = new import10.ViewContainer(16,12,this,this._anchor_16);
    this._TemplateRef_16_5 = new import17.TemplateRef_(this,16,this._anchor_16);
    this._NgSwitchDefault_16_6 = new import12.Wrapper_NgSwitchDefault(this._vc_16.vcRef,this._TemplateRef_16_5,this._NgSwitch_12_3.context);
    this._text_17 = this.renderer.createText(this._el_12,'\n        ',(null as any));
    this._text_18 = this.renderer.createText(this._el_0,'\n        ',(null as any));
    this._el_19 = import3.createRenderElement(this.renderer,this._el_0,'td',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_20 = this.renderer.createText(this._el_19,'\n          ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_19,'button',new import3.InlineArray16(14,'aria-label','Delete','class','btn btn-default btn-xs','mwlConfirmationPopover','','name','delete','placement','left','title','Delete End Point?','type','button'),(null as any));
    this._vc_21 = new import10.ViewContainer(21,19,this,this._el_21);
    this._ConfirmationPopover_21_5 = new import13.Wrapper_ConfirmationPopover(this._vc_21.vcRef,new import18.ElementRef(this._el_21),this.parentView.parentView.injectorGet(import19.ConfirmationPopoverOptions,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import20.ComponentFactoryResolver,this.parentView.parentIndex),this.parentView.parentView.injectorGet(import21.Positioning,this.parentView.parentIndex),this.renderer,this.parentView.parentView.injectorGet(import22.DOCUMENT,this.parentView.parentIndex));
    this._text_22 = this.renderer.createText(this._el_21,'\n            ',(null as any));
    this._el_23 = import3.createRenderElement(this.renderer,this._el_21,'span',new import3.InlineArray4(4,'aria-hidden','true','class','fa fa-trash'),(null as any));
    this._text_24 = this.renderer.createText(this._el_21,'\n            ',(null as any));
    this._el_25 = import3.createRenderElement(this.renderer,this._el_21,'span',new import3.InlineArray2(2,'class','sr-only'),(null as any));
    this._text_26 = this.renderer.createText(this._el_25,'Delete',(null as any));
    this._text_27 = this.renderer.createText(this._el_21,'\n          ',(null as any));
    this._text_28 = this.renderer.createText(this._el_19,'\n        ',(null as any));
    this._text_29 = this.renderer.createText(this._el_0,'\n      ',(null as any));
    var disposable_0:Function = import3.subscribeToRenderElement(this,this._el_0,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_0));
    var disposable_1:Function = import3.subscribeToRenderElement(this,this._el_3,new import3.InlineArray2(2,'click',(null as any)),this.eventHandler(this.handleEvent_3));
    var disposable_2:Function = import3.subscribeToRenderElement(this,this._el_21,new import3.InlineArray16(10,'confirm',(null as any),'click','document','touchend','document','click',(null as any),'resize','window'),this.eventHandler(this.handleEvent_21));
    this._ConfirmationPopover_21_5.subscribe(this,this.eventHandler(this.handleEvent_21),false,true,false);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._el_2,
      this._el_3,
      this._text_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._el_12,
      this._text_13,
      this._anchor_14,
      this._text_15,
      this._anchor_16,
      this._text_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._el_25,
      this._text_26,
      this._text_27,
      this._text_28,
      this._text_29
    ]
    ),[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    );
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import23.RouterLinkWithHref) && ((3 <= requestNodeIndex) && (requestNodeIndex <= 4)))) { return this._RouterLinkWithHref_3_3.context; }
    if (((token === import17.TemplateRef) && (14 === requestNodeIndex))) { return this._TemplateRef_14_5; }
    if (((token === import24.NgSwitchCase) && (14 === requestNodeIndex))) { return this._NgSwitchCase_14_6.context; }
    if (((token === import17.TemplateRef) && (16 === requestNodeIndex))) { return this._TemplateRef_16_5; }
    if (((token === import24.NgSwitchDefault) && (16 === requestNodeIndex))) { return this._NgSwitchDefault_16_6.context; }
    if (((token === import24.NgSwitch) && ((12 <= requestNodeIndex) && (requestNodeIndex <= 17)))) { return this._NgSwitch_12_3.context; }
    if (((token === import25.ConfirmationPopover) && ((21 <= requestNodeIndex) && (requestNodeIndex <= 27)))) { return this._ConfirmationPopover_21_5.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3_0_0:any = this._arr_41('/endPoints',this.context.$implicit.id);
    this._RouterLinkWithHref_3_3.check_routerLink(currVal_3_0_0,throwOnChange,false);
    this._RouterLinkWithHref_3_3.ngDoCheck(this,this._el_3,throwOnChange);
    const currVal_12_0_0:any = this.context.$implicit.enabled;
    this._NgSwitch_12_3.check_ngSwitch(currVal_12_0_0,throwOnChange,false);
    this._NgSwitch_12_3.ngDoCheck(this,this._el_12,throwOnChange);
    const currVal_14_0_0:any = true;
    this._NgSwitchCase_14_6.check_ngSwitchCase(currVal_14_0_0,throwOnChange,false);
    this._NgSwitchCase_14_6.ngDoCheck(this,this._anchor_14,throwOnChange);
    this._NgSwitchDefault_16_6.ngDoCheck(this,this._anchor_16,throwOnChange);
    const currVal_21_0_0:any = 'Delete End Point?';
    this._ConfirmationPopover_21_5.check_title(currVal_21_0_0,throwOnChange,false);
    const currVal_21_0_1:any = import3.inlineInterpolate(1,'Are you sure you want to delete End Point?</br /> <b>',this.context.$implicit.id,'</b>');
    this._ConfirmationPopover_21_5.check_message(currVal_21_0_1,throwOnChange,false);
    const currVal_21_0_2:any = 'left';
    this._ConfirmationPopover_21_5.check_placement(currVal_21_0_2,throwOnChange,false);
    this._ConfirmationPopover_21_5.ngDoCheck(this,this._el_21,throwOnChange);
    this._vc_14.detectChangesInNestedViews(throwOnChange);
    this._vc_16.detectChangesInNestedViews(throwOnChange);
    this._vc_21.detectChangesInNestedViews(throwOnChange);
    const currVal_40:any = (this.context.$implicit === this.parentView.context.selectedEndPoint);
    if (import3.checkBinding(throwOnChange,this._expr_40,currVal_40)) {
      this.renderer.setElementClass(this._el_0,'selected',currVal_40);
      this._expr_40 = currVal_40;
    }
    this._RouterLinkWithHref_3_3.checkHost(this,this,this._el_3,throwOnChange);
    const currVal_42:any = import3.inlineInterpolate(1,'',this.context.$implicit.id,'');
    if (import3.checkBinding(throwOnChange,this._expr_42,currVal_42)) {
      this.renderer.setText(this._text_4,currVal_42);
      this._expr_42 = currVal_42;
    }
    const currVal_43:any = import3.inlineInterpolate(1,'',this.context.$implicit.title,'');
    if (import3.checkBinding(throwOnChange,this._expr_43,currVal_43)) {
      this.renderer.setText(this._text_7,currVal_43);
      this._expr_43 = currVal_43;
    }
    const currVal_44:any = import3.inlineInterpolate(1,'',this.context.$implicit.created_by,'');
    if (import3.checkBinding(throwOnChange,this._expr_44,currVal_44)) {
      this.renderer.setText(this._text_10,currVal_44);
      this._expr_44 = currVal_44;
    }
  }
  destroyInternal():void {
    this._vc_14.destroyNestedViews();
    this._vc_16.destroyNestedViews();
    this._vc_21.destroyNestedViews();
    this._RouterLinkWithHref_3_3.ngOnDestroy();
    this._ConfirmationPopover_21_5.ngOnDestroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 14)) { return new View_EndPointListMyComponent2(this.viewUtils,this,14,this._anchor_14,this._vc_14); }
    if ((nodeIndex == 16)) { return new View_EndPointListMyComponent3(this.viewUtils,this,16,this._anchor_16,this._vc_16); }
    return (null as any);
  }
  handleEvent_0(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    if ((eventName == 'click')) {
      const pd_sub_0:any = ((<any>this.parentView.context.onSelect(this.context.$implicit)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
  handleEvent_3(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._RouterLinkWithHref_3_3.handleEvent(eventName,$event) && result);
    return result;
  }
  handleEvent_21(eventName:string,$event:any):boolean {
    this.markPathToRootAsCheckOnce();
    var result:boolean = true;
    result = (this._ConfirmationPopover_21_5.handleEvent(eventName,$event) && result);
    if ((eventName == 'confirm')) {
      const pd_sub_0:any = ((<any>this.parentView.context.delete(this.context.$implicit)) !== false);
      result = (pd_sub_0 && result);
    }
    return result;
  }
}
var renderType_EndPointListMyComponent:import2.RenderComponentType = import3.createRenderComponentType('',0,import4.ViewEncapsulation.None,styles_EndPointListMyComponent,{});
export class View_EndPointListMyComponent0 extends import1.AppView<import0.EndPointListMyComponent> {
  _text_0:any;
  _el_1:any;
  _text_2:any;
  _el_3:any;
  _text_4:any;
  _el_5:any;
  _text_6:any;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  _text_10:any;
  _el_11:any;
  _text_12:any;
  _el_13:any;
  _text_14:any;
  _el_15:any;
  _text_16:any;
  _text_17:any;
  _el_18:any;
  _text_19:any;
  _text_20:any;
  _el_21:any;
  _text_22:any;
  _text_23:any;
  _el_24:any;
  _text_25:any;
  _text_26:any;
  _el_27:any;
  _text_28:any;
  _text_29:any;
  _text_30:any;
  _text_31:any;
  _el_32:any;
  _text_33:any;
  _anchor_34:any;
  /*private*/ _vc_34:import10.ViewContainer;
  _TemplateRef_34_5:any;
  _NgFor_34_6:import26.Wrapper_NgFor;
  _text_35:any;
  _text_36:any;
  _text_37:any;
  constructor(viewUtils:import3.ViewUtils,parentView:import1.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_EndPointListMyComponent0,renderType_EndPointListMyComponent,import5.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import6.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import7.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._text_0 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._el_1 = import3.createRenderElement(this.renderer,parentRenderNode,'div',new import3.InlineArray2(2,'class','panel panel-default no-footer table-responsive'),(null as any));
    this._text_2 = this.renderer.createText(this._el_1,'\n  ',(null as any));
    this._el_3 = import3.createRenderElement(this.renderer,this._el_1,'div',new import3.InlineArray2(2,'class','panel-heading'),(null as any));
    this._text_4 = this.renderer.createText(this._el_3,'\n    ',(null as any));
    this._el_5 = import3.createRenderElement(this.renderer,this._el_3,'h3',new import3.InlineArray2(2,'class','panel-title'),(null as any));
    this._text_6 = this.renderer.createText(this._el_5,'End Points',(null as any));
    this._text_7 = this.renderer.createText(this._el_3,'\n  ',(null as any));
    this._text_8 = this.renderer.createText(this._el_1,'\n  ',(null as any));
    this._el_9 = import3.createRenderElement(this.renderer,this._el_1,'table',new import3.InlineArray16(10,'cellpadding','0','cellspacing','0','class','table table-striped','role','table','style','width:100%'),(null as any));
    this._text_10 = this.renderer.createText(this._el_9,'\n    ',(null as any));
    this._el_11 = import3.createRenderElement(this.renderer,this._el_9,'thead',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_12 = this.renderer.createText(this._el_11,'\n      ',(null as any));
    this._el_13 = import3.createRenderElement(this.renderer,this._el_11,'tr',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_14 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_15 = import3.createRenderElement(this.renderer,this._el_13,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_16 = this.renderer.createText(this._el_15,'ID',(null as any));
    this._text_17 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_18 = import3.createRenderElement(this.renderer,this._el_13,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_19 = this.renderer.createText(this._el_18,'Title',(null as any));
    this._text_20 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_21 = import3.createRenderElement(this.renderer,this._el_13,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_22 = this.renderer.createText(this._el_21,'Created By',(null as any));
    this._text_23 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_24 = import3.createRenderElement(this.renderer,this._el_13,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_25 = this.renderer.createText(this._el_24,'Enabled',(null as any));
    this._text_26 = this.renderer.createText(this._el_13,'\n        ',(null as any));
    this._el_27 = import3.createRenderElement(this.renderer,this._el_13,'th',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_28 = this.renderer.createText(this._el_27,'Actions',(null as any));
    this._text_29 = this.renderer.createText(this._el_13,'\n      ',(null as any));
    this._text_30 = this.renderer.createText(this._el_11,'\n    ',(null as any));
    this._text_31 = this.renderer.createText(this._el_9,'\n    ',(null as any));
    this._el_32 = import3.createRenderElement(this.renderer,this._el_9,'tbody',import3.EMPTY_INLINE_ARRAY,(null as any));
    this._text_33 = this.renderer.createText(this._el_32,'\n      ',(null as any));
    this._anchor_34 = this.renderer.createTemplateAnchor(this._el_32,(null as any));
    this._vc_34 = new import10.ViewContainer(34,32,this,this._anchor_34);
    this._TemplateRef_34_5 = new import17.TemplateRef_(this,34,this._anchor_34);
    this._NgFor_34_6 = new import26.Wrapper_NgFor(this._vc_34.vcRef,this._TemplateRef_34_5,this.parentView.injectorGet(import27.IterableDiffers,this.parentIndex),this.ref);
    this._text_35 = this.renderer.createText(this._el_32,'\n    ',(null as any));
    this._text_36 = this.renderer.createText(this._el_9,'\n  ',(null as any));
    this._text_37 = this.renderer.createText(this._el_1,'\n',(null as any));
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._text_0,
      this._el_1,
      this._text_2,
      this._el_3,
      this._text_4,
      this._el_5,
      this._text_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._el_11,
      this._text_12,
      this._el_13,
      this._text_14,
      this._el_15,
      this._text_16,
      this._text_17,
      this._el_18,
      this._text_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._text_23,
      this._el_24,
      this._text_25,
      this._text_26,
      this._el_27,
      this._text_28,
      this._text_29,
      this._text_30,
      this._text_31,
      this._el_32,
      this._text_33,
      this._anchor_34,
      this._text_35,
      this._text_36,
      this._text_37
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import17.TemplateRef) && (34 === requestNodeIndex))) { return this._TemplateRef_34_5; }
    if (((token === import28.NgFor) && (34 === requestNodeIndex))) { return this._NgFor_34_6.context; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_34_0_0:any = this.context.endPoints;
    this._NgFor_34_6.check_ngForOf(currVal_34_0_0,throwOnChange,false);
    this._NgFor_34_6.ngDoCheck(this,this._anchor_34,throwOnChange);
    this._vc_34.detectChangesInNestedViews(throwOnChange);
  }
  destroyInternal():void {
    this._vc_34.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import1.AppView<any> {
    if ((nodeIndex == 34)) { return new View_EndPointListMyComponent1(this.viewUtils,this,34,this._anchor_34,this._vc_34); }
    return (null as any);
  }
}