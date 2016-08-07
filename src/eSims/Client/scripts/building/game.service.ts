import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { Game } from './game';

@Injectable()
export class GameService {
  constructor(private http: Http) { }

  private controllerUrl = 'api/game';

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getGames() {
    return this.http
      .get(this.controllerUrl)
      .toPromise()
      .then(r => r.json() as Game[])
      .catch(this.handleError);
  }

  createGame(name: string) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(this.controllerUrl, '"' + name + '"', { headers: headers })
      .toPromise()
      .then(r => r.json() as number)
      .catch(this.handleError);
  }

}