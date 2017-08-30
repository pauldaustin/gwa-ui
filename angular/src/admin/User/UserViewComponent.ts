import {
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { BaseDetailComponent } from '../../shared/Component/BaseDetailComponent';
import { User } from './User';
import { UserService } from './UserService';

@Component({
  selector: 'app-user-view',
  templateUrl: 'UserView.html'
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
        .subscribe((data: { user: User }) => {
          this.setTitle(`User: ${data.user.username} - Gateway Admin`);
          this.setObject(data.user);
        }
        );
    }
  }

}
