import { HttpMethod } from '../model/HttpMethod';

export class EndPoint {
  id : String;
  name : String;
  ownerUserName?: String;
  enabled?: boolean;
  httpMethods?: Array<HttpMethod>; 
  
}
/*
API Mapping (Mapping on *.api.gov.bc.ca or *.apps.gov.bc.ca)
  API Keys
    Enable support for Developers to  add keys
    Add Application API Keys
    Disable a Developer Key
    Delete an API key
    Define Rate limits for an API key
    Define default rate limit for new Developer API keys
  Flag indicating if ACL should be applied.
  List of global groups that can access the endpoint in addition t  the endpoint's group
Apps Mapping (Mapping on (*. or gwa.).apps.gov.bc.ca, secured by Siteminder)
  Flag indicating if ACL should be applied.
  List of global groups that can access the endpoint in addition t  the endpoint's group
Private Endpoint
  URL (Url of the service t  proxy)
  Username
  Password
Kong Plugin Configuration
  Supported plugins will be implemented via a simple configuration file per Kong plugin. This will allow addition of new plugins easily.
  Rate limiting
    Assigned t  each API Key if supported by owner. Defaults can be defined t  be used for new API keys.
    Second
    Minute
    Hour
    Day
    Month
    Year
  ACL
    Each endpoint will have a Kong group named GWA_<EndpointName>
List of users that can access the endpoint.
*/