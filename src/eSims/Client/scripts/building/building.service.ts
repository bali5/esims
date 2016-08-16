import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { Floor } from './floor';

@Injectable()
export class BuildingService {
  constructor(private http: Http) { }

  private controllerUrl = 'api/building';

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getFloors(buildingId: number) {
    let headers = new Headers({
      'eSimsBuilding': buildingId
    });

    return this.http
      .get(this.controllerUrl, { headers: headers })
      .toPromise()
      .then(r => r.json() as Floor[])
      .catch(this.handleError);
  }

}