import { Component, ContentChildren, QueryList, AfterContentInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CanvasElement } from './canvas.element'
import { CanvasBorder } from './canvas.border'
import { CanvasMouseEvent } from './canvas.mouse.event'
import { CanvasImage } from './canvas.image'

@Component({
  selector: 'esc-canvas',
  template: '<canvas #canvas (window:resize)="onResize()" (click)="onclick($event)" (dblclick)="ondblclick($event)" (drag)="ondrag($event)" (dragend)="ondragend($event)" (dragenter)="ondragenter($event)" (dragleave)="ondragleave($event)" (dragover)="ondragover($event)" (dragstart)="ondragstart($event)" (drop)="ondrop($event)" (mousedown)="onmousedown($event)" (mousemove)="onmousemove($event)" (mouseout)="onmouseout($event)" (mouseover)="onmouseover($event)" (mouseup)="onmouseup($event)" (scroll)="onscroll($event)" (wheel)="onwheel($event)"></canvas><ng-content></ng-content>',
  directives: [
    CanvasElement,
    CanvasBorder,
    CanvasImage
  ]
})
export class Canvas implements AfterContentInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ContentChildren(CanvasElement) items: QueryList<CanvasElement>;

  private canvasElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private animateStartTime: number = Date.now();
  private animateLastTime: number = Date.now();

  private cachedItems: CanvasElement[];

  constructor(private element: ElementRef) {
  }

  ngAfterContentInit() {
    this.cachedItems = this.items.toArray();
    this.items.changes.subscribe(() => {
      this.cachedItems = this.items.toArray();
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.canvasElement = <HTMLCanvasElement>this.canvas.nativeElement;
    this.context = this.canvasElement.getContext('2d');

    setTimeout(() => this.onInit(), 10);
  }

  onInit() {
    this.onResize();
    requestAnimationFrame(() => this.animate());
  }

  onResize() {
    this.canvasElement.width = this.element.nativeElement.offsetWidth;
    this.canvasElement.height = this.element.nativeElement.offsetHeight;

    this.draw();
  }

  draw() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
      this.context.save();
      this.cachedItems.forEach((item, index, array) => {
        item.draw(this.context);
      });
      this.context.restore();
    }
  }

  animate() {
    if (this.context) {
      var current = Date.now();
      var elapsed = current - this.animateLastTime;
      this.animateLastTime = current
      this.cachedItems.forEach((item, index, array) => {
        item.animate(elapsed);
      });
      this.draw();
    }

    requestAnimationFrame(() => this.animate());
  }

  findElementByCoordinates(list: CanvasElement[], x: number, y: number): CanvasMouseEvent {
    for (let item of list) {
      if (item.contains(x, y)) {
        let event = this.findElementByCoordinates(item.cachedItems, x - item.left, y - item.top);
        if (!event) {
          event = new CanvasMouseEvent();
          event.canvas = this;
          event.element = item;
          event.elementX = x;
          event.elementY = y;
        }
        return event;
      }
    }
    return null;
  }

  onclick(event: MouseEvent) {
    let mouseEvent = this.findElementByCoordinates(this.cachedItems, event.offsetX, event.offsetY);
    if (mouseEvent) {
      mouseEvent.event = event;
      mouseEvent.element.raiseclick(mouseEvent);
    }
  }
  ondblclick(event: MouseEvent) {
  }
  ondrag(event: MouseEvent) {
  }
  ondragend(event: MouseEvent) {
  }
  ondragenter(event: MouseEvent) {
  }
  ondragleave(event: MouseEvent) {
  }
  ondragover(event: MouseEvent) {
  }
  ondragstart(event: MouseEvent) {
  }
  ondrop(event: MouseEvent) {
  }
  onmousedown(event: MouseEvent) {
  }
  onmousemove(event: MouseEvent) {
    let mouseEvent = this.findElementByCoordinates(this.cachedItems, event.offsetX, event.offsetY);
    if (mouseEvent) {
      mouseEvent.event = event;
      mouseEvent.element.raisemousemove(mouseEvent);
    }
  }
  onmouseout(event: MouseEvent) {
  }
  onmouseover(event: MouseEvent) {
  }
  onmouseup(event: MouseEvent) {
  }
  onscroll(event: MouseEvent) {
  }
  onwheel(event: MouseEvent) {
    let mouseEvent = this.findElementByCoordinates(this.cachedItems, event.offsetX, event.offsetY);
    if (mouseEvent) {
      mouseEvent.event = event;
      mouseEvent.element.raisewheel(mouseEvent);
    }
  }

}
