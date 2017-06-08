export class Field {
  name: string;
  fieldType: string;
  required = false;
  defaultValue: any;
  immutable = false;
  values: any[] = [];
  created_at: string;
  disabled: boolean;
}
