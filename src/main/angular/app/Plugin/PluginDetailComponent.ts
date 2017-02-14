import 'rxjs/add/operator/switchMap';

import {
  Component,
  Input,
  OnInit
}              from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
}            from '@angular/forms';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';

import { Plugin } from './Plugin';
import { Api } from '../Api/Api';
import { ApiService } from '../Api/ApiService';
import { PluginService } from './PluginService';

@Component({
  moduleId: module.id,
  selector: 'plugin-detail',
  templateUrl: './PluginDetailComponent.html'
})
export class PluginDetailComponent implements OnInit {
  form : FormGroup;
  formGroupConfig : FormGroup;
  
  groups = [
    {
      title: 'Details',
      formGroupName: 'core',
      fields: [
        {name: 'enabled', title: 'Enabled', type: 'checkbox'},
        {name: 'created_at', title: 'Created At', type: 'text', readOnly: true},
      ],
    }, {
      title: 'Configuration',
      formGroupName: 'config',
      fields: new Array<any>(),
    }
  ];
  
  plugin: Plugin;
  
  constructor(
    private formBuilder: FormBuilder,
    protected service: PluginService,
    protected apiService: ApiService,
    protected route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroupConfig = this.formBuilder.group({});
    
    this.form = this.formBuilder.group({
      core: this.formBuilder.group({
        enabled: true
      }),
      config: this.formGroupConfig
    });
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
      if (this.plugin) {
        this.form.patchValue({
          core: {
            enabled: this.plugin.enabled
          },
          config: this.plugin.config
        });
      }
    });
  }
  
  ngOnInit(): void {
    var name:string;
    this.route.params
      .switchMap((params: Params) => {
        name = params['name'];
        this.setPluginName(name);
        return this.apiService.getApi(params['api_id']);
      })
      .subscribe((api : Api) => {
        for (let plugin of api.plugins) {
          if (plugin.name == name) {
            this.plugin = plugin;
            this.form.patchValue({
              core: {
                enabled: this.plugin.enabled
              },
              config: this.plugin.config
            });
            return;
          }
        }
        this.plugin = null;
      });
  }

  postSave(): void {
    this.router.navigate(['/apis', this.plugin.api.id, '/plugins']);
  }

  save(): void {
   this.service.updateObject(this.plugin)
     .then((data) => {
       this.postSave();
     });
  }

}