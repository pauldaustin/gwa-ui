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
import { BcGovTemplateConfig } from './BcGovTemplateConfig';
import { MenuItem } from './MenuItem';

@Component({
  selector: 'app-bcgov-template',
  templateUrl: 'BcGovTemplate.html',
  styleUrls: ['BcGovTemplate.css']
})
export class BcGovTemplateComponent {

  title: String = '';

  headerMenuItems: Array<MenuItem>;

  headerMenuVisible: false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
    @Optional() config: BcGovTemplateConfig
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

  isMenuVisible(menuItem: MenuItem): boolean {
    for (const route of this.router.config) {
      if (route.path === menuItem.routerLink) {
        if (route.data) {
          const roles: string[] = route.data['roles'];
          if (roles) {
            const visible = this.authService.hasAnyRole(roles);
            return visible;
          }
        }
      }
    }
    return true;
  }

  get username(): string {
    return this.authService.username;
  }
}
