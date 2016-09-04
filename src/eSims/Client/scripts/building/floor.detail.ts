import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { BuildingConfig } from './building.config'

import { Floor } from './floor';
import { FloorCanvasElement } from './floor.canvas.element';
import { RoomTemplate } from './room.template';
import { Room } from './room';

import { RoomService } from './room.service';

import { DialogProvider } from './../common/dialog.provider';

@Component(material({
  selector: 'es-floor-detail',
  templateUrl: 'views/building/floor-detail.html'
}))
export class FloorDetail implements AfterViewInit {
  constructor(private roomService: RoomService, private buildingConfig: BuildingConfig, private dialogProvider: DialogProvider) { }

  private _floor: Floor;
  get floor(): Floor {
    return this._floor;
  }
  @Input()
  set floor(value: Floor) {
    this._floor = value;
    this.cancel();
  }

  @ViewChild('b') border: ElementRef;
  @ViewChild('floorCanvas') floorCanvas: FloorCanvasElement;

  private size: number;
  private cellSize: number;

  private currentAction: string;
  private currentActionParameter: any;

  ngAfterViewInit() {
    setTimeout(() => this.onResize());

    this.floorCanvas.canvasclick.subscribe((e) => {
      if (this.currentAction == 'build') {
        this.roomService.addRoom(this.floor.id, this.currentActionParameter.id, this.floorCanvas.selectLeft, this.floorCanvas.selectTop, this.floorCanvas.rotate).then((t) => this.floor.rooms.push(t));
        if (!e.event.ctrlKey) {
          this.cancel();
        }
      } else if (this.currentAction == 'room') {
        this.cancel();
      }
    });
  }

  onResize() {
    this.size = Math.min(this.border.nativeElement.offsetWidth, this.border.nativeElement.offsetHeight);
    this.cellSize = (this.size - 4) / this.buildingConfig.maxFloorSize;
  }

  startBuildingRoom(room: RoomTemplate) {
    this.currentAction = 'build';
    this.currentActionParameter = room;

    this.floorCanvas.rotate = 0;

    this.floorCanvas.selectWidth = room.width;
    this.floorCanvas.selectHeight = room.height;
  }

  cancel() {
    this.currentAction = null;
    this.currentActionParameter = null;

    this.floorCanvas.selectWidth = 0;
    this.floorCanvas.selectHeight = 0;
  }

  rotateLeft() {
    this.floorCanvas.rotate = (this.floorCanvas.rotate - 1) % 4;
  }

  rotateRight() {
    this.floorCanvas.rotate = (this.floorCanvas.rotate + 1) % 4;
  }

  removeRoom() {
    this.dialogProvider.message('Remove room', 'Do you want to remove the room?', ['Yes', 'No']).then((action) => {
      if (action == 'Yes') {
        let room = this.currentActionParameter;
        this.roomService.removeRoom(room.id).then(() => {
          this.floor.rooms.splice(this.floor.rooms.indexOf(room), 1);
        });
      }
      this.cancel();
    });
  }

  selectRoom(room: Room) {
    if ((this.currentAction == 'room' && this.currentActionParameter == room) || room.name == 'Elevator') {
      this.cancel();
    } else {
      this.currentAction = 'room';
      this.currentActionParameter = room;
    }
  }

}
