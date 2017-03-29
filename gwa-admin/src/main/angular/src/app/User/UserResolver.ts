import { Injectable } from '@angular/core';
import { 
  Router, 
  Resolve, 
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { User } from './User';
import { UserService } from './UserService';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private service: UserService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    let userName = route.params[this.service.pathParamName];
    return this.service.getObject(userName).then(user => {
      if (user) {
        return user;
      } else {
        this.router.navigate(['/ui/users']);
        return null;
      }
    });
  }
}