export class Field {
  name : string;
  fieldType : string;
  required : boolean = false;
  defaultValue : any;
  immutable : boolean = false;
  values : any[] = [];
  created_at : string;
  disabled: boolean;
}
