import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import {BaseDetailComponent} from 'revolsys-angular-framework';
import {User} from './User';
import {UserService} from './user.service';

@Component({
  selector: 'admin-user-view',
  templateUrl: 'user-view.component.html'
})
export class UserViewComponent extends BaseDetailComponent<User> implements OnInit {
  constructor(
    protected injector: Injector,
    protected service: UserService
  ) {
    super(injector, service, 'User - Gateway Admin');
  }

  ngOnInit() {
    if (this.addPage) {
      super.ngOnInit();
    } else {
      this.route.parent.data
        .subscribe((data: {user: User}) => {
          this.setTitle(`User: ${data.user.username} - Gateway Admin`);
          this.setObject(data.user);
        }
        );
    }
  }

}
