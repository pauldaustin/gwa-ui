import {Observable} from 'rxjs';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
  Injectable,
  Injector
} from '@angular/core';

import {AuthService} from 'revolsys-angular-framework';
import {
  PageConfig,
  SecurityService
} from 'revolsys-angular-bcgov-page';

@Injectable()
export class AdminSecurityService implements SecurityService {

  constructor(
    private authService: AuthService,
    private pageConfig: PageConfig
  ) {
    this.pageConfig.securityService = this;
  }

  getUsername(): string {
    return this.authService.username;
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }

  hasAnyRoleAsync(roles: string[]): Observable<boolean> {
    return this.authService.hasAnyRoleAsync(roles);
  }
}
