import 'rxjs/add/operator/switchMap';

import {
  Component,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {Params} from '@angular/router';

import {BaseDetailComponent} from '../../../shared/Component/BaseDetailComponent';

import {Api} from '../Api';
import {ApiService} from '../ApiService';

import {Plugin} from '../../Plugin/Plugin';
import {PluginService} from '../../Plugin/PluginService';

import {PluginFormGroup} from './PluginFormGroup';
import {PluginFormField} from './PluginFormField';

@Component({
  selector: 'app-api-plugin-view',
  templateUrl: 'api-plugin-view.component.html'
})
export class ApiPluginViewComponent extends BaseDetailComponent<Plugin> implements OnInit {
  protected apiService: ApiService = this.injector.get(ApiService);

  api: Api;

  groups: PluginFormGroup[] = new Array<PluginFormGroup>(
    new PluginFormGroup('enabled', null)
  );

  name: string;

  constructor(
    protected injector: Injector,
    protected service: PluginService,
    protected route: ActivatedRoute,
  ) {
    super(injector, service, 'Plugin - Gateway Admin');
  }

  getPluginSchema(pluginName: String): Promise<any> {
    this.setTitle(`Plugin: ${name} - API ${this.api.name} - Gateway Admin`);
    return this.service.getPluginSchema(name);
  }

  setPluginName(name: string) {
    this.getPluginSchema(name).then((pluginSchema: any) => {
      const hasCoreFields = this.groups.length > 0;
      let form;
      if (hasCoreFields) {
        const formGroupCore = this.formBuilder.group({
          enabled: true
        });

        this.groups[0].addField({
          name: 'enabled',
          title: 'Enabled',
          fieldType: 'checkbox'
        }, formGroupCore.controls['enabled']);
        form = this.formBuilder.group({
          core: formGroupCore
        });
      } else {
        form = this.formBuilder.group({});
      }
      const config = this.object.config;
      const fieldsByName: {[name: string]: PluginFormField} = {};
      this.addFields(fieldsByName, '', form, 'config', pluginSchema, config);

      this.addLayout(pluginSchema, fieldsByName);
      if (hasCoreFields) {
        form.patchValue({
          core: {
            enabled: this.object.enabled
          },
          config: config
        });
      } else {
        form.patchValue({
          config: config
        });
      }
      this.form = form;
    });
  }

  private addLayout(
    pluginSchema: any,
    fieldsByName: {[name: string]: PluginFormField},
  ) {
    const layout = pluginSchema['layout'];
    for (const group of layout) {
      const pluginFormGroup = new PluginFormGroup(group['name'], group['title']);
      for (const fieldNameRow of group['fields']) {
        const pluginRow: PluginFormField[] = [];
        for (const fieldName of fieldNameRow) {
          const pluginFormField = fieldsByName[fieldName];
          if (pluginFormField) {
            pluginRow.push(pluginFormField);
          }
        }
        if (pluginRow.length > 0) {
          pluginFormGroup.addRow(pluginRow);
        }
      }
      if (pluginFormGroup.rows.length > 0) {
        this.groups.push(pluginFormGroup);
      }
    }
  }

  private addFields(
    fieldsByName: {[name: string]: PluginFormField},
    prefix: string,
    parentForm: FormGroup,
    groupName: string,
    schema: any,
    config: any,
    title: string = null
  ): FormGroup {
    const formGroup = this.formBuilder.group({});
    parentForm.addControl(groupName, formGroup);

    const schemaFields = schema.fields;
    for (const fieldName of Object.keys(schemaFields)) {
      const schemaField = schemaFields[fieldName];
      this.addField(fieldsByName, prefix, formGroup, fieldName, schemaField, config);
    }
    return formGroup;
  }

  private addField(
    fieldsByName: {[name: string]: PluginFormField},
    prefix: string,
    formGroup: FormGroup,
    fieldName: string,
    pluginField: any,
    config: any
  ) {
    let value = config[fieldName];
    const fieldType = pluginField.fieldType;
    if (!value) {
      value = pluginField['defaultValue'];
    }
    if (fieldType === 'array') {
      if (value == null || Object.keys(value).length === 0) {
        value = [];
      }
    } else if (fieldType === 'table') {
      if (value == null || Object.keys(value).length === 0) {
        value = {};
      }
    } else {
      if (value == null) {
        value = '';
      }
    }
    config[fieldName] = value;
    let formControl: AbstractControl;
    if (fieldType === 'array') {
      const formArray = this.formBuilder.array([]);
      for (const arrayValue of value) {
        formArray.push(new FormControl(arrayValue, Validators.required));
      }
      formControl = formArray;
    } else if (fieldType === 'table') {
      formControl = this.addFields(
        fieldsByName,
        prefix + fieldName + '.',
        formGroup,
        fieldName,
        pluginField,
        config[fieldName]
      );
    } else if (pluginField.required) {
      formControl = new FormControl(value, Validators.required);
    } else {
      formControl = new FormControl(value);
    }
    if (pluginField.readOnly) {
      formControl.disable();
    }

    if (fieldType !== 'table') {
      const pluginFormField = new PluginFormField(pluginField, formControl);
      formGroup.addControl(fieldName, formControl);
      fieldsByName[prefix + fieldName] = pluginFormField;
    }
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: {plugin: Plugin}) => {
        this.object = data.plugin;
        this.api = this.object.api;
        this.setPluginName(this.object.name);
      }
      );
  }

  protected saveDo(): Promise<Plugin> {
    if (this.form.controls['core']) {
      this.saveValues(this.object, this.form.controls['core']);
    }
    this.saveValues(this.object.config, this.form.controls['config']);
    return super.saveDo();
  }
}
