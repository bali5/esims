import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import './../common/rxjs-extensions';

import { Floor } from './floor';
import { Person } from './../person/person';
import { Room } from './room';
import { RoomTemplate } from './room.template';

import { $WebSocket } from 'angular2-websocket/angular2-websocket'

import { DialogProvider, Dialog } from './../common/dialog.provider';

@Injectable()
export class BuildingService {
  private socket: WebSocket;
  private currentId: number = 1;
  private promises: {} = {};
  private queue: any[] = [];

  public floorChange: EventEmitter<Floor> = new EventEmitter<Floor>();
  public roomChange: EventEmitter<{ action: 'add' | 'update' | 'remove', room: Room | number }> = new EventEmitter<{ action: 'add' | 'update' | 'remove', room: Room | number }>();
  public personChange: EventEmitter<Person> = new EventEmitter<Person>();
  public statsChange: EventEmitter<{}> = new EventEmitter<{}>();

  toUpper(o) {
    if (o == null) return null;

    let build, key, destKey, value;

    if (o instanceof Array) {
      build = [];
      for (key in o) {
        value = o[key];

        if (typeof value === "object") {
          value = this.toUpper(value);
        }
        build.push(value);
      }
    } else {
      build = {};
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          destKey = (key.charAt(0).toUpperCase() + key.slice(1) || key).toString();
          value = o[key];
          if (value !== null && typeof value === "object") {
            value = this.toUpper(value);
          }

          build[destKey] = value;
        }
      }
    }
    return build;
  }

  toCamel(o) {
    if (o == null) return null;

    let build, key, destKey, value;

    if (o instanceof Array) {
      build = [];
      for (key in o) {
        value = o[key];

        if (typeof value === "object") {
          value = this.toCamel(value);
        }
        build.push(value);
      }
    } else {
      build = {};
      for (key in o) {
        if (o.hasOwnProperty(key)) {
          destKey = (key.charAt(0).toLowerCase() + key.slice(1) || key).toString();
          value = o[key];
          if (value !== null && typeof value === "object") {
            value = this.toCamel(value);
          }

          build[destKey] = value;
        }
      }
    }
    return build;
  }

  setBuildingId(value: number) {
    this.socket = new WebSocket(window.location.href.replace(window.location.protocol, 'ws:'));

    this.socket.onopen = (() => {
      console.log('WS opened...');

      for (var message of this.queue) {
        this.socket.send(JSON.stringify(message));
      }
    });

    this.socket.onerror = (() => {
      console.log('WS error.');
    });

    this.socket.onclose = (() => {
      console.log('WS closed.');
    });

    this.socket.onmessage = ((e) => {
      let data = this.toCamel(JSON.parse(e.data));
      console.log(data);

      if (data.id && this.promises[data.id]) {
        if (data.isSuccessful) {
          let message = this.toCamel(JSON.parse(data.message));
          this.promises[data.id].resolve(message);
        } else {
          this.promises[data.id].reject(data.message);
        }
      } else {
        if (data.persons) {
          for (let item of data.persons) {
            this.personChange.emit(item);
          }
        }
        if (data.addedRooms) {
          for (let item of data.addedRooms) {
            this.roomChange.emit({ action: 'add', room: item });
          }
        }
        if (data.updatedRooms) {
          for (let item of data.updatedRooms) {
            this.roomChange.emit({ action: 'update', room: item });
          }
        }
        if (data.removedRooms) {
          for (let item of data.removedRooms) {
            this.roomChange.emit({ action: 'remove', room: item });
          }
        }
        if (data.floors) {
          for (let item of data.floors) {
            this.floorChange.emit(item);
          }
        }
        if (data.stats) {
          this.statsChange.emit(data.stats);
        }
      }
    });
  }

  constructor(private dialogProvider: DialogProvider) {
    console.log('New Building Service');
  }

  private handleError(error: any) {
    console.warn('An error occurred', error);
    this.dialogProvider.message('Oops...', error);
    return error;
  }

  private action<T>(action: string, data: any = null): Promise<T> {
    let id = this.currentId++;
    let message = {
      Id: id,
      Action: action,
      Data: JSON.stringify(typeof data == 'number' ? data : this.toUpper(data))
    };

    if (this.socket.readyState == 1) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.queue.push(message);
    }

    let p: any = this.promises[id] = {};
    p.promise = new Promise((resolve, reject) => {
      p.resolve = resolve;
      p.reject = reject;
    });

    return p.promise.catch((e) => this.handleError(e));
  }

  getGame() {
    return this.action<{ name: string }>('GetGame');
  }

  getFloors() {
    return this.action<Floor[]>('GetFloors');
  }

  addFloor() {
    return this.action<Floor>('AddFloor');
  }

  getStats() {
    return this.action<any>('GetStats');
  }

  getRoomTemplates() {
    return this.action<RoomTemplate[]>('GetRoomTemplates');
  }

  addRoom(levelId: number, templateId: number, x: number, y: number, rotation: number) {
    return this.action<Room>('AddRoom', {
      ParentId: levelId,
      ChildId: templateId,
      X: x,
      Y: y,
      Rotation: rotation
    });
  }

  removeRoom(id: number) {
    return this.action<any>('RemoveRoom', id);
  }

  
  getAvailablePersons() {
    return this.action<Person[]>('GetPersonsAvailable');
  }

  getPersons() {
    return this.action<Person[]>('GetPersonsHired');
  }

  hirePerson(id: number) {
    return this.action<any>('HirePerson', id);
  }

  speedMinus(id: number) {
    return this.action<any>('SpeedMinus');
  }

  speedPlus(id: number) {
    return this.action<any>('SpeedPlus');
  }

}