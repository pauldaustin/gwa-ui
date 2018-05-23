import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {User} from './User';
import {UserService} from './user.service';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private service: UserService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const username = route.params[this.service.pathParamName];
    return this.service.getObject(username).pipe(
      filter(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/ui/users']);
          return false;
        }
      })
    );
  }
}
