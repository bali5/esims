import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Action } from './action';

import { BuildingConfig } from './building.config'
import { BuildingService } from './building.service';

import { Floor } from './floor';
import { FloorCanvasElement } from './floor.canvas.element';
import { RoomTemplate } from './room.template';
import { Room } from './room';

import { DialogProvider } from './../common/dialog.provider';

@Component({
  selector: 'es-floor-detail',
  templateUrl: 'views/building/floor-detail.html'
})
export class FloorDetail implements AfterViewInit {
  constructor(private service: BuildingService, private buildingConfig: BuildingConfig, private dialogProvider: DialogProvider) { }

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
        this.service.addRoom(this.floor.id, this.currentActionParameter.id, this.floorCanvas.selectLeft, this.floorCanvas.selectTop, this.floorCanvas.rotate);
        if (!e.event.ctrlKey) {
          this.cancel();
        }
      } else if (this.currentAction == 'room') {
        this.cancel();
      }
    });
  }

  onResize() {
    let size = Math.min(this.border.nativeElement.offsetWidth, this.border.nativeElement.offsetHeight) - 4;
    size = size - (size % this.buildingConfig.maxFloorSize);
    this.size = size + 4;
    this.cellSize = size / this.buildingConfig.maxFloorSize;
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
        this.service.removeRoom(room.id);
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
