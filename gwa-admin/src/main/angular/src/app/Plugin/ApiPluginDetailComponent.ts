import 'rxjs/add/operator/switchMap';

import {
  Component,
  Injector,
  Input
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { Params } from '@angular/router';

import { BaseDetailComponent } from '../Component/BaseDetailComponent';

import { Api } from '../Api/Api';
import { ApiService } from '../Api/ApiService';

import { Plugin } from './Plugin';
import { PluginService } from './PluginService';

@Component({
  selector: 'api-plugin-detail',
  templateUrl: 'app/Plugin/ApiPluginDetail.html'
})
export class ApiPluginDetailComponent extends BaseDetailComponent<Plugin> {
  protected apiService: ApiService = this.injector.get(ApiService);

  api : Api;

  form : FormGroup;
  
  formGroupConfig : FormGroup;
  
  groups = [
    {
      formGroupName: 'core',
      fields: [
        {name: 'enabled', title: 'Enabled', type: 'checkbox'},
      ],
    }, {
      formGroupName: 'config',
      fields: new Array<any>(),
    }
  ];
  
  name : string;

  constructor(
    protected injector:Injector,
    protected service: PluginService
  ) {
    super(injector, service);
  }

  setPluginName(name: string) {
    this.service.getPluginSchema(name).then((schema: any) => {
      let schemaFields : any = schema.fields;
      let fields : any[] = [];
      for (let name in schemaFields) {
        let schemaField = schemaFields[name];
        let defaultValue = schemaField.default;
        if (defaultValue == null) {
          defaultValue = '';
        }
        let field = {
          name: name,
          title: name,
          placeholder: name,
          required: schemaField.required,
          type: schemaField.type,
          default: schemaField.default 
        };
        var formControl: FormControl;
        if (schemaField.required) {
          formControl = new FormControl(defaultValue, Validators.required);
        } else {
          formControl = new FormControl(defaultValue);
        }
        this.formGroupConfig.addControl(name, formControl);
        if (schemaField.type == 'boolean') {
          field['type'] = 'checkbox';
        }
        if (schemaField.enum) {
          field['type'] = 'select';
          field['values'] = schemaField.enum;
        }
        fields.push(field);
      }
      this.groups[1].fields = fields;
      this.form.patchValue({
        core: {
          enabled: this.object.enabled
        },
        config: this.object.config
      });
     });
  }
  
  ngOnInit(): void {
    this.formGroupConfig = this.formBuilder.group({});
    
    this.form = this.formBuilder.group({
      core: this.formBuilder.group({
        enabled: true
      }),
      config: this.formGroupConfig
    });

    this.route.params
      .switchMap((params: Params) => {
        this.name = params['name'];
        return this.apiService.getObject(params['apiName']);
      })
      .subscribe((api : Api) => {
        this.api = api;
        for (let plugin of api.plugins) {
          if (plugin.name == this.name) {
            this.object = plugin;
          }
        }
        if (this.object == null) {
          this.object = this.service.newObject();
          this.object.api_id = api.id;
          this.object.api = api;
          this.object.name = this.name;
        }
        this.setPluginName(this.name);
     });
  }

  postSave(savedObject: Plugin): void {
    this.router.navigate(['/ui/apis', savedObject.api.name, {tabIndex: 1}]);
  }
}