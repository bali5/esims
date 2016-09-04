import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { Person } from './person';

@Injectable()
export class PersonService {
  constructor(private http: Http) { }

  private controllerUrl = 'api/person';
  public static buildingId: number;

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getAvailablePersons() {
    let headers = new Headers({
      'eSimsBuilding': PersonService.buildingId
    });

    return this.http
      .get(this.controllerUrl + '?state=available', { headers: headers })
      .toPromise()
      .then(r => r.json() as Person[])
      .catch(this.handleError);
  }

  getPersons() {
    let headers = new Headers({
      'eSimsBuilding': PersonService.buildingId
    });

    return this.http
      .get(this.controllerUrl + '?state=hired', { headers: headers })
      .toPromise()
      .then(r => r.json() as Person[])
      .catch(this.handleError);
  }

  hirePerson(id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'eSimsBuilding': PersonService.buildingId
    });

    return this.http
      .post(this.controllerUrl, id, { headers: headers })
      .toPromise()
      .catch(this.handleError);
  }

}