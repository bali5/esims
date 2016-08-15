import { Component, ContentChildren, QueryList, AfterContentInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CanvasElement } from './canvas.element'
import { CanvasBorder } from './canvas.border'

@Component({
  selector: 'esc-canvas',
  template: '<canvas #canvas (window:resize)="onResize()"></canvas><ng-content></ng-content>'
})
export class Canvas implements AfterContentInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ContentChildren(CanvasBorder) items: QueryList<CanvasBorder>;

  private canvasElement: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private animateStartTime: number = Date.now();
  private animateLastTime: number = Date.now();

  constructor(private element: ElementRef) {
  }

  ngAfterContentInit() {
    this.items.changes.subscribe(() => {
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
      this.items.forEach((item, index, array) => {
        item.draw(this.context);
      });
    }
  }

  animate() {
    if (this.context) {
      var current = Date.now();
      var elapsed = current - this.animateLastTime;
      this.animateLastTime = current
      this.items.forEach((item, index, array) => {
        item.animate(this.context, elapsed);
      });
    }

    setTimeout(() => this.animate(), 30);
  }

}
