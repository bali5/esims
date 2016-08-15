import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Action } from './action';

import material from './../common/material';

import { Floor } from './floor';

@Component(material({
  selector: 'es-floor-detail',
  templateUrl: 'views/building/floor-detail.html',
}))
export class FloorDetail implements AfterViewInit {
  @Input() floor: Floor;

  @ViewChild('b') border: ElementRef;

  public roomLocation: Object;
  public size: number;

  ngAfterViewInit() {
    setTimeout(() => this.onResize());
  }

  onResize() {
    this.size = Math.min(this.border.nativeElement.offsetWidth, this.border.nativeElement.offsetHeight);
  }

  onMouseMove(event: MouseEvent) {
    var off = this.getOffset(event.srcElement);

    this.roomLocation = {
      x: event.offsetX,
      y: event.offsetY
    }
  }

  getOffset(element: any): { x: number, y: number } {
    if (!element) return { x: 0, y: 0 };

    var off = this.getOffset(element.offsetParent);

    off.x += element.offsetLeft;
    off.y += element.offsetTop;

    return off;
  }

}
