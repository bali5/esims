import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { Floor } from './floor';
import { FloorCanvasElement } from './floor.canvas.element';
import { RoomTemplate } from './room.template';

import { RoomService } from './room.service';

@Component(material({
  selector: 'es-floor-detail',
  templateUrl: 'views/building/floor-detail.html'
}))
export class FloorDetail implements AfterViewInit {
  constructor(private roomService: RoomService) { }

  @Input() floor: Floor;

  @ViewChild('b') border: ElementRef;
  @ViewChild('floorCanvas') floorCanvas: FloorCanvasElement;

  public size: number;

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
      }
    });
  }

  onResize() {
    this.size = Math.min(this.border.nativeElement.offsetWidth, this.border.nativeElement.offsetHeight);
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

}
