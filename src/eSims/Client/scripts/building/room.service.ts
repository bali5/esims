import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { RoomTemplate } from './room.template';
import { Room } from './room';

@Injectable()
export class RoomService {
  constructor(private http: Http) { }

  private controllerUrl = 'api/room';
  public static buildingId: number;

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getRoomTemplates() {
    let headers = new Headers({
      'eSimsBuilding': RoomService.buildingId
    });

    return this.http
      .get(this.controllerUrl + '/template', { headers: headers })
      .toPromise()
      .then(r => r.json() as RoomTemplate[])
      .catch(this.handleError);
  }

  addRoom(levelId: number, templateId: number, x: number, y: number, rotation: number) {
    let headers = new Headers({
      'eSimsBuilding': RoomService.buildingId
    });

    return this.http
      .post(this.controllerUrl, {
        ParentId: levelId,
        ChildId: templateId,
        X: x,
        Y: y,
        Rotation: rotation
      }, { headers: headers })
      .toPromise()
      .then(r => r.json() as Room)
      .catch(this.handleError);
  }

}