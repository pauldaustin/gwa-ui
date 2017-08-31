import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {ApiPluginViewComponent} from '../../Api/Plugin/api-plugin-view.component';
import {UserDataService} from './user-data.service';
import {Plugin} from '../../Plugin/Plugin';

@Component({
  selector: 'app-user-data-view',
  templateUrl: '../../Api/Plugin/api-plugin-view.component.html'
})
export class UserDataViewComponent extends ApiPluginViewComponent implements OnInit {
  protected userDataService: UserDataService = this.injector.get(UserDataService);

  usernameParam: string;

  dataName: string;

  ngOnInit(): void {
    this.groups.length = 0;
    this.route.params
      .switchMap(params => {
        this.usernameParam = params['username'];
        this.dataName = params['dataName'];
        this.id = params['id'];
        if (this.id && '_add_' !== this.id) {

          return this.userDataService.getObjectDo(
            `/users/${this.usernameParam}/data/${this.dataName}/${this.id}`, {
              user_username: this.usernameParam
            }
          );
        } else {
          this.id = null;
          const data = this.userDataService.newObject();
          data.name = this.dataName;
          data.user_username = this.usernameParam;
          return Promise.resolve(data);
        }
      })
      .subscribe(object => {
        this.setObject(object);
        if (object) {
          this.setPluginName(object.name);
        }
      });
  }

  getPluginSchema(dataName: string): Promise<any> {
    if (this.id) {
      this.setTitle(`${this.id} - ${dataName} - User ${this.usernameParam} - Gateway Admin`);
    } else {
      this.setTitle(`Add ${dataName} - User ${this.usernameParam} - Gateway Admin`);
    }

    return this.userDataService.getSchema(this.username, dataName);
  }

  protected saveDo(): Promise<Plugin> {
    this.saveValues(this.object.config, this.form.controls['config']);
    return this.userDataService.addOrUpdateObject(this.object);
  }
}
