import { Observable } from 'rxjs/Observable';
import {
  Component,
  Optional
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../Authentication/AuthService';
import {BcGovTemplateConfig} from './BcGovTemplateConfig';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'bcgov-template',
  templateUrl: 'app/bcgov-template/BcGovTemplate.html',
  styleUrls: ['app/bcgov-template/BcGovTemplate.css']
})
export class BcGovTemplate {

  title : String = '';

  headerMenuItems : Array<MenuItem>;

  constructor(
    private router : Router,
    private authService: AuthService,
    private titleService: Title,
    @Optional() config : BcGovTemplateConfig
  ) {
    if (config) {
      this.title = config.title;
      if (this.title) {
        this.titleService.setTitle(config.title);
      }
      if (config.headerMenuItems) {
        this.headerMenuItems = config.headerMenuItems;
      }
    } 
  }

  isMenuVisible(menuItem : MenuItem) : boolean {
    for (let route of this.router.config) {
      if (route.path == menuItem.routerLink) {
        if (route.data) {
          const roles : string[] = route.data['roles'];
          if (roles) {
            const visible = this.authService.hasAnyRole(roles);
            return visible;
          }
        }
      }
    }
    return true;
  }
}
