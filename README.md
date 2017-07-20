# Kong Api Gateway Administration

This project contains a web interface for managing the KONG Api Gateway.

The GWA includes a  


## Installation

### Requirements

1. Kong 0.10.0+
2. luarocks
3. JDK 1.8+
4. J2EE Servlet Container 3.1
  * Jetty 9.4+
  * Tomcat 8.5

### BCGOV GWA Endpoint Kong Plugin

Release and install the kong-bcgov-gwa-endpoint.

[kong-bcgov-gwa-endpoint Release and Installation Instructions](https://gogs.data.gov.bc.ca/DataBC/kong-bcgov-gwa-endpoint)

### Additional Kong Plugins

Install the following additional Kong Plugins

* [Upstream Auth Basic](https://revolsys.github.io/kong-plugin-upstream-auth-basic/)

### GitHub Organization Access

The GWA Developer Key application requires OAuth application access to the organization that the
developers must be a member of.

1. Open the OAuth applications configuration page for the GitHub organization
     https://github.com/organizations/gwa-qa/settings/applications - Delivery & Test
     https://github.com/organizations/bcgov/settings/applications - Production
2. Click Register a new application and Enter the following fields.
  * Application name: gwa-(prod,test,delivery)
  * **Homepage URL:** https://gwa(-t,-d).apps.gov.bc.ca
  * **Application Description:** GWA Developer key for <environment>
  * **Authorization callback URL:** https://gwa(-t,-d).apps.gov.bc.ca/git/callback
3. Click Register application
4. Record the Client ID and Client Secret for the configuration.

### Configuration Properties
The application supports the following configuration properties.

| Name                  | Description                | Sample Value                                 |
|-----------------------|----------------------------|----------------------------------------------|
| gwaTermsUrl           | URL to terms of us page    | http://www2.gov.bc.ca/gov/content?id=D1EE0A405E584363B205CD4353E02C88 |
| gwaKongAdminUrl       | URL to kong rest API       | http://localhost:8001                        |
| gwaKongAdminUsername  | Username for kong rest API | kong                                         |
| gwaKongAdminPassword  | Password for kong rest API | dgdftyftye                                   |
| gwaGitHubOrganization | GitHub Org name            | bcggov or gwa-qa                             |
| gwaGitHubClientId     | GitHub Org Client ID       | abcdefgh0123456789123                        |
| gwaGitHubClientSecret | GitHub Ord Client Secret   | abcdefgh01234567890123456789012345678912     |

Create the config/gwa.properties file containing the above properties. This directory must be in
the working directory that the servlet container runs in.

### Deploy Web Application

|||
|---------------------|-----------------------------|
| **Container**       | Dedicated                   |
| **Context Path**    | /                           |
| **Application URL** | https://gwa.apps.gov.bc.ca/ |


### Application URLS

* https://gwa.apps.gov.bc.ca/     - Developer Keys
* https://gwa.apps.gov.bc.ca/int/ - Gateway (Kong) Administration

### Configure Admin Users

The first time the application is deployed Kong must be configured to allow access for the first
admin user. Further users can be added using the GWA.

Access Gateway Admin URL in a web browser and login using your IDIR account.

https://gwa.apps.gov.bc.ca/int/

This will create a kong consumer for your account.

The consumer username will be all lower case in the form idir_<accountname> (e.g. idir_pxaustin).

Add the consumer to the gwa_admin group.

```bash
curl -X POST http://localhost:8001/consumers/idir_<accountName>/acls \
    --data "group=gwa_admin"
```

Wait 2 minutes for the cache of users groups to clear then access the Gateway Admin. You should now
be granted access.

https://gwa.apps.gov.bc.ca/int/
