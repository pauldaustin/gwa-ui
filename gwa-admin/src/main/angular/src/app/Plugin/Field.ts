export class Field {
  name : string;
  type : string;
  required : boolean = false;
  default : any;
  immutable : boolean = false;
  values : any[] = [];
  created_at : string;
}
