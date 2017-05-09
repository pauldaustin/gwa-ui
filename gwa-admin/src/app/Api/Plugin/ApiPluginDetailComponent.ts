import 'rxjs/add/operator/switchMap';

import {
  Component,
  Injector,
  Input
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';

import { Params } from '@angular/router';

import { BaseDetailComponent } from '../../Component/BaseDetailComponent';

import { Api } from '../Api';
import { ApiService } from '../ApiService';

import { Plugin } from '../../Plugin/Plugin';
import { PluginService } from '../../Plugin/PluginService';

@Component({
  selector: 'api-plugin-detail',
  templateUrl: 'ApiPluginDetail.html'
})
export class ApiPluginDetailComponent extends BaseDetailComponent<Plugin> {
  protected apiService: ApiService = this.injector.get(ApiService);

  api : Api;
  
  groups = [
    {
      formGroupName: 'core',
      fields: [
        {name: 'enabled', title: 'Enabled', fieldType: 'checkbox'},
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
      const formGroupConfig = this.formBuilder.group({});;
      const config = this.object.config;
      let schemaFields : any = schema.fields;
      let fields : any[] = [];
      this.groups[1].fields = fields;
      for (let name in schemaFields) {
        let schemaField = schemaFields[name];
        let defaultValue = schemaField['default'];
        if (defaultValue == null) {
          if (schemaField.type == 'array') {
            defaultValue = [];
          } else {
            defaultValue = '';
          }
        }
        let field = {
          name: name,
          title: name,
          placeholder: name,
          required: schemaField.required,
          fieldType: schemaField.type,
          defaultValue: defaultValue,
        };
        if (!(name in config) || !config[name]) {
          config[name] = defaultValue;
        }
        var formControl: AbstractControl;
        if (schemaField.type == 'array') {
          let formArray = this.formBuilder.array([]);
          for (let value of config[name]) {
            formArray.push(new FormControl(value, Validators.required));
          }
          formControl = formArray;
        } else if (schemaField.required) {
          formControl = new FormControl(defaultValue, Validators.required);
        } else {
          formControl = new FormControl(defaultValue);
        }
        if (schemaField.readOnly) {
          formControl.disable();
        }
        formGroupConfig.addControl(name, formControl);
        if (schemaField.type == 'boolean') {
          field.fieldType = 'checkbox';
        }
        if (schemaField.enum) {
          field.fieldType = 'select';
          field['values'] = schemaField.enum;
        }
        fields.push(field);
      }
      
      const form = this.formBuilder.group({
        core: this.formBuilder.group({
          enabled: true
        }),
        config: formGroupConfig
      });

      form.patchValue({
        core: {
          enabled: this.object.enabled
        },
        config: config
      });
      this.form = form;
    });

  }
  
  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => {
        this.name = params['name'];
        this.id = this.name;
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
  
  protected saveDo(): Promise<Plugin> {
    this.saveValues(this.object, this.form.controls['core']);
    this.saveValues(this.object.config, this.form.controls['config']);
    return super.saveDo();
  }

  
  addFieldValue(formArray : FormArray) {
    formArray.push(new FormControl(null, Validators.required));
  }
 
  deleteFieldValue(formArray : FormArray, index : number) {
    formArray.removeAt(index);
  }
}