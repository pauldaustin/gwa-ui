import { Api }         from '../Api/Api';

export class Plugin {
  id : string;
  api_id : string;
  api_name : string;
  api? : Api;
  consumer_id? : string;
  consumer_username? : string;
  name : string;
  config : {[key: string]: any} = {};
  enabled : boolean = true;
  created_at : string;
  
  
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      config: this.config,
      enabled: this.enabled,
    };
  }
  
}
