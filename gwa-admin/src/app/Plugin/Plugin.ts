import { Api } from '../Api/Api';

export class Plugin {
  id: string;
  name: string;
  config: { [key: string]: any } = {};
  enabled = true;
  api_id: string;
  api_name: string;
  api: Api;
  user_id: string;
  user_username: string;
  created_at: string;

  constructor(name?: string, config: { [key: string]: any } = {}, enabled = true) {
    this.name = name;
    this.config = config;
    this.enabled = enabled;
  }


  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      config: this.config,
      enabled: this.enabled,
      created_at: this.created_at
    };
  }

}
