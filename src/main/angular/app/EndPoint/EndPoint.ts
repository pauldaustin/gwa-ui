import { ApiKey } from '../ApiKey/ApiKey';

interface HttpMethodState {
  name: string;
  enabled: boolean;
}

export class EndPoint {
  private static ALL_METHODS: Array<string> = [
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "DELETE"
  ];
  
  id : string;
  name : string;
  title : string;
  created_by: string = "Unknown";
  upstream_url: string;
  upstream_username: string;
  upstream_password: string;
  apps_deploy : boolean;
  apis_deploy : boolean;
  enabled: boolean = true;
  allowed_http_method_flags: Array<HttpMethodState> = [];
  _apiKeys: Array<ApiKey> = [];

  constructor() {
    this.allowed_http_methods = null;
  }

  get allowed_http_methods(): Array<string> {
    let allowed_http_methods: Array<string> = [];
    if (this.allowed_http_method_flags) {
      for (let methodFlag of this.allowed_http_method_flags) {
        if (methodFlag.enabled) {
          allowed_http_methods.push(methodFlag.name);
        }
      }
    }
    return allowed_http_methods;
  }
  
  set allowed_http_methods(allowedHttpMethods: Array<string>) {
    this.allowed_http_method_flags.length = 0;
    for (let method of EndPoint.ALL_METHODS) {
      var enabled : boolean;
      if (allowedHttpMethods) {
        enabled = allowedHttpMethods.indexOf(method) != -1;
      } else {
        enabled = method == "GET";
      }
      this.allowed_http_method_flags.push({name: method, enabled: enabled});
    }
  }
 
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

  getAllMethods(): Array<string> {
    return EndPoint.ALL_METHODS;
  }
  
  toJSON(): any {
    return {
      id : this.id,
      name : this.name,
      title : this.title,
      created_by: this.created_by,
      upstream_url: this.upstream_url,
      upstream_username: this.upstream_username,
      upstream_password: this.upstream_password,
      apis_deploy : this.apis_deploy,
      apps_deploy : this.apps_deploy,
      enabled: this.enabled,
      allowed_http_methods: this.allowed_http_methods,
      api_keys: this._apiKeys
    };
  }
}
