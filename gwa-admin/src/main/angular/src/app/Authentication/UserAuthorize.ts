import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './AuthService';

@Injectable()
export class UserAuthorize implements CanActivate {

  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate() {
    return this.authService.hasAnyRole(['GWA_USER', 'GWA_ADMIN']);
  }

}