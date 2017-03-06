import {
  Component,
  Optional
} from '@angular/core';
import {Router} from '@angular/router';
import {BcGovTemplateConfig} from './BcGovTemplateConfig';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'bcgov-template',
  templateUrl: 'BcGovTemplate.html',
  styleUrls: ['BcGovTemplate.css']
})
export class BcGovTemplate {
  title: String = '';
  headerMenuItems: Array<MenuItem>;
  
  constructor(@Optional() config: BcGovTemplateConfig) {
    if (config) {
      this.title = config.title;
      if (config.headerMenuItems) {
        this.headerMenuItems = config.headerMenuItems;
      }
    } 
  }
}
