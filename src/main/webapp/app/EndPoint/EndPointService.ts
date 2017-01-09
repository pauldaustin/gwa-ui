import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { EndPoint } from './EndPoint';

@Injectable()
export class EndPointService {
  private serviceUrl = 'http://localhost:8080/gwa/data/endPoints';  // URL to web api
 
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getEndPoints(): Promise<EndPoint[]> {
    return this.http.get(this.serviceUrl)
      .toPromise()
      .then(response => {
        let endPoints: EndPoint[] = [];
        let data = response.json().data;
        if (data) {
          response.json().data.forEach((endPointJson: any) => {
            let endPoint = this.toEndPoint(endPointJson);
            endPoints.push(endPoint);
          });
        }
        return endPoints;
      })
      .catch(this.handleError);
  }

  toEndPoint(endPointJson: any) : EndPoint {
    let endPoint = new EndPoint();
    Object.assign(endPoint, endPointJson);
    return endPoint;
  }

  getMyEndPoints(): Promise<EndPoint[]> {
    const url = `${this.serviceUrl}/my`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let endPoints: EndPoint[] = [];
        let data = response.json().data;
        if (data) {
          response.json().data.forEach((endPointJson: any) => {
            let endPoint = this.toEndPoint(endPointJson);
            endPoints.push(endPoint);
          });
        }
        return endPoints;
      })
      .catch(this.handleError);
  }

  getEndPoint(id: String): Promise<EndPoint> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let data = response.json().data;
        return this.toEndPoint(data);
      })
      .catch(this.handleError);
  }

  create(name: string): Promise<EndPoint> {
    return this.http
      .post(this.serviceUrl, JSON.stringify({name: name}), {headers: this.jsonHeaders})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  
  update(endPoint: EndPoint): Promise<EndPoint> {
    const url = `${this.serviceUrl}/${endPoint.id}`;
    return this.http
      .put(url, JSON.stringify(endPoint), {
        headers: this.jsonHeaders
      })
      .toPromise()
      .then(() => endPoint)
      .catch(this.handleError);
  }
  
  delete(id: String): Promise<void> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url, {headers: this.jsonHeaders})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
