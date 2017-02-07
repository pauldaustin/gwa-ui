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
  upstream_url : string;
  preserve_host : boolean;
  created_at : string;
  retries : number;
  https_only : boolean;
  http_if_terminated : boolean;
  hosts : Array<String>;
  uris : Array<String>;
  strip_uri : boolean;

  title : string;
  created_by: string = "Unknown";
  upstream_username: string;
  upstream_password: string;
  enabled: boolean = true;
  method_flags: Array<HttpMethodState> = [];
  _apiKeys: Array<ApiKey> = [];

  constructor() {
    this.methods = null;
  }

  get methods(): Array<string> {
    let methods: Array<string> = [];
    if (this.method_flags) {
      for (let methodFlag of this.method_flags) {
        if (methodFlag.enabled) {
          methods.push(methodFlag.name);
        }
      }
    }
    return methods;
  }
  
  set methods(allowedHttpMethods: Array<string>) {
    this.method_flags.length = 0;
    for (let method of EndPoint.ALL_METHODS) {
      var enabled : boolean;
      if (allowedHttpMethods) {
        enabled = allowedHttpMethods.indexOf(method) != -1;
      } else {
        enabled = method == "GET";
      }
      this.method_flags.push({name: method, enabled: enabled});
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
      upstream_url: this.upstream_url,
      methods: this.methods,
      preserve_host : this.preserve_host,
      created_at : this.created_at,
      retries : this.retries,
      https_only : this.https_only,
      http_if_terminated : this.http_if_terminated,
      hosts : this.hosts,
      uris : this.uris,
      strip_uri : this.strip_uri,
      
      title : this.title,
      created_by: this.created_by,
      upstream_username: this.upstream_username,
      upstream_password: this.upstream_password,
      enabled: this.enabled,
    };
  }
}
