import { Api } from '../Api/Api';

export class Endpoint extends Api {

  static uri(object : any): string {
    if (object.uri_template) {
      return object.uri_template.replace(
        /\$\{.+?\}/g,
        (match: string)=>{
          const name = match.substr(2, match.length - 3);
          console.log(name);
          return object[name];
        }
      );
    }
  }

  created_by: string = "Unknown";

  uri_template: string;

  upstream_username: string;

  upstream_password: string;

  toJSON(): any {
    const json = super.toJSON();
    json.endPoint = {
      created_by: this.created_by,
      uri_template: this.uri_template,
      upstream_username: this.upstream_username,
      upstream_password: this.upstream_password,
    };
    return json;
  }
}
