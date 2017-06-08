import { Api } from '../Api/Api';

export class Plugin {
  id?: string;
  api_id?: string;
  api_name?: string;
  api?: Api;
  user_id?: string;
  user_username?: string;
  created_at?: string;

  constructor(
    public name?: string,
    public config: { [key: string]: any } = {},
    public enabled: boolean = true,
  ) {
  }


  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      config: this.config,
      enabled: this.enabled,
    };
  }

}
