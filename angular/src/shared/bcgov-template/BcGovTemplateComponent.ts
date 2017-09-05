import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import {
  Component,
  Optional,
  OnInit
} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthService} from '../Authentication/auth.service';
import {Config} from '../Config';
import {MenuItem} from './MenuItem';

@Component({
  selector: 'app-bcgov-template',
  templateUrl: 'BcGovTemplate.html',
  styleUrls: ['BcGovTemplate.css']
})
export class BcGovTemplateComponent implements OnInit {

  title: String = '';

  headerMenuItems: Array<MenuItem>;

  headerMenuVisible = false;

  footerMenuVisible = false;

  showHeaderAndFooter = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private titleService: Title,
    @Optional() config: Config
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.showHeaderAndFooter) {
        this.showHeaderAndFooter = !('true' === params['contentOnly']);
      }
    });
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
