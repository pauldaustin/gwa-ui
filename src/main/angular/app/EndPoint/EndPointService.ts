import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ApiKey } from '../ApiKey/ApiKey';

import { EndPoint } from './EndPoint';

@Injectable()
export class EndPointService {
  private serviceUrl = '/gwa/data/endPoints';
 
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  create(endPoint: EndPoint): Promise<any> {
    const url = this.serviceUrl;
    const jsonText = JSON.stringify(endPoint);
    return this.http
      .post(
        url,
        jsonText,
        {
          headers: this.jsonHeaders
        }
      )
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  } 

  createApiKey(endPointId: string, userTitle: string): Promise<ApiKey> {
    const url = `${this.serviceUrl}/${endPointId}`;
    const jsonText = JSON.stringify({
      apiKey: {
        user_title: userTitle
      }
    });
    return this.http
      .post(
        url,
        jsonText,
        {
          headers: this.jsonHeaders
        }
      )
      .toPromise()
      .then(response => {
        const data = response.json().data;
        return this.toApiKey(data);
      })
      .catch(this.handleError);
  } 

  delete(id: string): Promise<any> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url, {
        headers: this.jsonHeaders,
      })
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  deleteApiKey(endPointId: string, apiKeyId: string): Promise<any> {
    const url = `${this.serviceUrl}/${endPointId}/apiKeys/${apiKeyId}`;
    return this.http.delete(url, {
        headers: this.jsonHeaders
      })
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  getEndPoint(id: string): Promise<EndPoint> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toEndPoint(data);
      })
      .catch(this.handleError);
  }

  getEndPoints(): Promise<EndPoint[]> {
    return this.http.get(this.serviceUrl)
      .toPromise()
      .then(response => {
        let endPoints: EndPoint[] = [];
        const data = response.json().data;
        if (data) {
          data.forEach((endPointJson: any) => {
            let endPoint = this.toEndPoint(endPointJson);
            endPoints.push(endPoint);
          });
        }
        return endPoints;
      })
      .catch(this.handleError);
  }


  getMyEndPoints(): Promise<EndPoint[]> {
    const url = `${this.serviceUrl}/my`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let endPoints: EndPoint[] = [];
        const data = response.json().data;
        if (data) {
          data.forEach((endPointJson: any) => {
            let endPoint = this.toEndPoint(endPointJson);
            endPoints.push(endPoint);
          });
        }
        return endPoints;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  update(endPoint: EndPoint): Promise<EndPoint> {
    const url = `${this.serviceUrl}/${endPoint.id}`;
    const jsonText = JSON.stringify(endPoint);
    return this.http
      .put(
        url,
        jsonText,
        {
          headers: this.jsonHeaders
        }
      )
      .toPromise()
      .then(() => endPoint)
      .catch(this.handleError);
  }

  toApiKey(apiKeyJson: any) : ApiKey {
    let apiKey = new ApiKey();
    Object.assign(apiKey, apiKeyJson);
    return apiKey;
  }

  toEndPoint(endPointJson: any) : EndPoint {
    let endPoint = new EndPoint();
    Object.assign(endPoint, endPointJson);
    return endPoint;
  }
}
