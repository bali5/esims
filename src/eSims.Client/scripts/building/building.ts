import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BuildingConfig } from './building.config'
import { BuildingService } from './building.service';
import { PersonList } from './../person/person.list';
import { Room } from './room';
import { Floor } from './floor';
import { FloorThumb } from './floor.thumb';
import { FloorDetail } from './floor.detail';
import { FloorCanvasElement } from './floor.canvas.element';
import { BackgroundCanvasElement } from './background';
import { RoomDetail } from './room.detail';
import { RoomTemplate } from './room.template';
import { RoomTemplateList } from './room.template.list';
import { Action } from './action';

import { HumanResources } from './../person/hr'

import { DialogElement } from './../common/dialog';
import { DialogProvider, Dialog } from './../common/dialog.provider';

import * as _ from 'lodash';

@Component({
  selector: 'es-building',
  templateUrl: 'views/building/building.html',
  providers: [
  ]
})
export class Building implements OnInit {
  constructor(private route: ActivatedRoute, private buildingService: BuildingService, private buildingConfig: BuildingConfig, private dialogProvider: DialogProvider) { }

  @ViewChild('floorDetail') floorDetail: FloorDetail;

  public id: number;
  public name: string;
  public stats;
  public date: Date;

  public currentActionTemplate: string;

  public actions: Action[] = [
    new Action('Hire new employee', 'Hire a new employee from the HR pool', 'person_add', 'person', () => { this.currentActionTemplate = 'es-hr'; return true; }),
    new Action('Employee list', 'Show hired employees', 'people', 'person', () => {
      let dialog = new Dialog();
      dialog.header = 'Employee list';
      dialog.content = PersonList;
      dialog.isFullScreen = true;
      dialog.canCancel = true;
      this.dialogProvider.show(dialog);
      return false;
    }),

    new Action('Add a new room', 'Create new work places', 'flip_to_front', 'money', () => { this.currentActionTemplate = 'es-room-template-list'; return true; }),
    new Action('Build a new level', 'Make your tower higher', 'format_indent_increase', 'money', () => { this.addFloor(); this.currentActionTemplate = null; return false; })
  ];

  public floors: Floor[] = [];

  public selectedFloor: Floor;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.buildingService.setBuildingId(this.id);
      this.buildingService.getGame().then(t => this.name = t.name);
      this.buildingService.getStats().then(t => {
        this.stats = t;
        this.date = new Date(t.simulationTime);
      });
      this.buildingService.getFloors().then(t => {
        this.floors = t;
        this.selectedFloor = this.floors[0];
      });
      this.buildingService.floorChange.subscribe(s => this.floors.splice(0, 0, s));
      this.buildingService.roomChange.subscribe(s => {
        switch (s.action) {
          case 'add':
            let room = <Room>s.room;
            this.getFloor(room.floorId).rooms.push(room);
            break;
          case 'update':
            this.updateRoom(<Room>s.room)
            break;
          case 'remove':
            this.removeRoom(<number>s.room);
            break;
        }
      });
      this.buildingService.statsChange.subscribe(t => {
        this.stats = t;
        this.date = new Date(t.simulationTime);
      });
      
    });
  }

  getFloor(id: number) {
    for (let floor of this.floors) {
      if (floor.id == id) {
        return floor;
      }
    }
    return null;
  }

  updateRoom(room: Room) {
    for (let floor of this.floors) {
      if (floor.id == room.floorId) {
        for (let orig of floor.rooms) {
          if (orig.id == room.id) {
            _.merge(orig, room);
            return;
          }
        }
        return;
      }
    }
  }

  removeRoom(id: number) {
    for (let floor of this.floors) {
      for (let i = 0; i < floor.rooms.length; i++) {
        if (floor.rooms[i].id == id) {
          floor.rooms.splice(i, 1);
          return;
        }
      }
    }
  }

  addFloor() {
    this.buildingService.addFloor();
  }

  onBuildRoom(room: RoomTemplate) {
    this.floorDetail.startBuildingRoom(room);
  }

}