import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Action } from './action';
import { CanvasComponent, CanvasElement } from './../canvas/canvas.element'

import material from './../common/material';

import { Room } from './room';

@CanvasComponent(material({
  selector: 'es-room-detail'
}))
export class RoomDetail extends CanvasElement {
  @Input() room: Room;
  private static images = {};

  constructor(element: ElementRef) {
    super(element);
  }

  private static getImage(room: Room) {
    if (!room) return null;

    let url = '/images/';
    if (room.bathroomMaxCount) {
      url += 'bathroom_' + room.width + '_' + room.height;
    } else if (room.smokeMaxCount) {
      url += 'smoke_' + room.width + '_' + room.height;
    } else if (room.workplaceMaxCount) {
      url += 'office_' + room.width + '_' + room.height;
    } else if (room.kitchenMaxCount) {
      url += 'kitchen_' + room.width + '_' + room.height;
    } else if (room.width == 1 && room.height == 1) {
      url += 'floor_' + room.width + '_' + room.height;
    } else if (room.width == 4 && room.height == 4) {
      url += 'elevator_' + room.width + '_' + room.height;
    }
    url += '.svg';

    let image = RoomDetail.images[url];

    if (!image) {
      image = {
        image: new Image(),
        isReady: false
      };

      image.image.onload = () => {
        image.isReady = true;
      };

      RoomDetail.images[url] = image;

      image.image.src = url;
    }

    return image.isReady ? image.image : null;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    let image = RoomDetail.getImage(this.room);

    if (!image) return;

    context.translate(this.width / 2, this.height / 2);
    context.rotate(this.room.rotation * 90 * Math.PI / 180);

    let w = this.room.rotation % 2 == 0 ? this.width : this.height;
    let h = this.room.rotation % 2 == 1 ? this.width : this.height;

    context.drawImage(image, -w / 2, -h / 2, w, h);
  }

  onAnimate(elapsedTime: number): void {
  }


}
