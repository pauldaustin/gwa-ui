import { Api } from '../Api/Api';

export class ApiKey {
  api: Api;
  id : string;
  developer_key: boolean;
  user_title : string;
  enabled: boolean = true;
  rate_limit: string;
}
