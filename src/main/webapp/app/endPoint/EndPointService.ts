import { EndPoint } from './EndPoint';
import { END_POINTS } from './mock-EndPoint';
import { Injectable } from '@angular/core';

@Injectable()
export class EndPointService {
  getEndPoints(): Promise<EndPoint[]> {
    return Promise.resolve(END_POINTS);
  }

  getEndPoint(id: String): Promise<EndPoint> {
    let endPoints: Promise<EndPoint[]> = this.getEndPoints();
    return endPoints.then(endPoints => endPoints.find(endPoint => endPoint.id === id));
  }
}
