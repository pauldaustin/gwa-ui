import { HttpMethod } from '../model/HttpMethod';
import { ApiKey } from '../ApiKey/ApiKey';

export class EndPoint {
  id : String;
  title : String;
  created_by: String = "Unknown";
  upstream_url: String;
  upstream_username: String;
  upstream_password: String;
  enabled: boolean = true;
  allowed_http_methods: Array<HttpMethod> = [0];
  _apiKeys: Array<ApiKey> = [];
  
  get api_keys(): Array<ApiKey> {
    return this._apiKeys;
  }
   
  get apiKeys(): Array<ApiKey> {
    return this._apiKeys;
  }
  
  set api_keys(apiKeysJson) {
    let apiKeys = this._apiKeys;
    apiKeysJson.forEach((apiKeyJson: any) => {
      let apiKey = new ApiKey();
      Object.assign(apiKey, apiKeyJson);
      apiKeys.push(apiKey);
    });
  }
}
