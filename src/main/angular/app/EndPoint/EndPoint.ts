import { HttpMethod } from '../model/HttpMethod';
import { ApiKey } from '../ApiKey/ApiKey';

export class EndPoint {
  id : string;
  title : string;
  created_by: string = "Unknown";
  upstream_url: string;
  upstream_username: string;
  upstream_password: string;
  enabled: boolean = true;
  allowed_http_methods: Array<HttpMethod> = [0];
  _apiKeys: Array<ApiKey> = [];

  apiKeyAdd(apiKey: ApiKey) {
    this._apiKeys.push(apiKey);
  }

  apiKeyRemove(apiKey: ApiKey) {
    this._apiKeys = this._apiKeys.filter(key => key !== apiKey);
  }

  get api_keys(): Array<ApiKey> {
    return this._apiKeys;
  }
   
  get apiKeys(): Array<ApiKey> {
    return this._apiKeys;
  }
  
  set api_keys(apiKeysJson) {
    if (apiKeysJson) {
      let apiKeys = this._apiKeys;
      apiKeysJson.forEach((apiKeyJson: any) => {
        let apiKey = new ApiKey();
        Object.assign(apiKey, apiKeyJson);
        apiKeys.push(apiKey);
      });
    } else {
      this._apiKeys.length = 0;
    }
  } 

  toJSON(): any {
    return {
      id : this.id,
      title : this.title,
      created_by: this.created_by,
      upstream_url: this.upstream_url,
      upstream_username: this.upstream_username,
      upstream_password: this.upstream_password,
      enabled: this.enabled,
      allowed_http_methods: this.allowed_http_methods,
      api_keys: this._apiKeys
    };
  }
}
