import { Component, ContentChildren, QueryList, AfterContentInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CanvasElement } from './canvas.element'
import { CanvasBorder } from './canvas.border'

@Component({
  selector: 'esc-canvas',
  template: '<canvas #canvas (window:resize)="onResize()" (click)="onclick($event)" (dblclick)="ondblclick($event)" (drag)="ondrag($event)" (dragend)="ondragend($event)" (dragenter)="ondragenter($event)" (dragleave)="ondragleave($event)" (dragover)="ondragover($event)" (dragstart)="ondragstart($event)" (drop)="ondrop($event)" (mousedown)="onmousedown($event)" (mousemove)="onmousemove($event)" (mouseout)="onmouseout($event)" (mouseover)="onmouseover($event)" (mouseup)="onmouseup($event)" (scroll)="onscroll($event)" (wheel)="onwheel($event)"></canvas><ng-content></ng-content>',
  directives: [
    CanvasElement,
    CanvasBorder
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

    setTimeout(() => this.animate(), 30);
  }

  onResize() {
    this.canvasElement.width = this.element.nativeElement.offsetWidth;
    this.canvasElement.height = this.element.nativeElement.offsetHeight;

    this.draw();
  }

  draw() {
    if (this.context) {
      this.cachedItems.forEach((item, index, array) => {
        item.draw(this.context);
      });
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
      this.cachedItems.forEach((item, index, array) => {
        item.draw(this.context);
      });
    }

    setTimeout(() => this.animate(), 30);
  }

  findElementByCoordinates(list: CanvasElement[], x: number, y: number): CanvasElement {
    for (let item of list) {
      if (item.contains(x, y)) {
        return this.findElementByCoordinates(item.cachedItems, x - item.left, y - item.top) || item;
      }
    }
    return null;
  }

  onclick(event: MouseEvent) {
    let item = this.findElementByCoordinates(this.cachedItems, event.offsetX, event.offsetY);
    if (item) {
      item.raiseclick(event);
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
  }

}
