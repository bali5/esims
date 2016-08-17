import 'reflect-metadata';

import { Input, Output, EventEmitter, Directive, Component, ComponentMetadata, provide, forwardRef } from '@angular/core';
import { ContentChildren, QueryList, AfterContentInit } from '@angular/core';

//import * as _ from 'lodash';

@CanvasComponent({
  selector: 'esc-element'
})
export abstract class CanvasElement implements AfterContentInit {
  @ContentChildren(CanvasElement) items: QueryList<CanvasElement>;
  public cachedItems: CanvasElement[];

  @Input() left: number;
  @Input() top: number;
  @Input() width: number;
  @Input() height: number;

  @Input() foreground: string | CanvasGradient | CanvasPattern = '#000000';
  @Input() background: string | CanvasGradient | CanvasPattern = 'transparent';

  @Input() isAnimated: boolean = false;

  public isChanged: boolean = true;

  @Output() canvasclick = new EventEmitter<MouseEvent>();
  @Output() canvasdblclick = new EventEmitter<MouseEvent>();
  @Output() canvasdrag = new EventEmitter<MouseEvent>();
  @Output() canvasdragend = new EventEmitter<MouseEvent>();
  @Output() canvasdragenter = new EventEmitter<MouseEvent>();
  @Output() canvasdragleave = new EventEmitter<MouseEvent>();
  @Output() canvasdragover = new EventEmitter<MouseEvent>();
  @Output() canvasdragstart = new EventEmitter<MouseEvent>();
  @Output() canvasdrop = new EventEmitter<MouseEvent>();
  @Output() canvasmousedown = new EventEmitter<MouseEvent>();
  @Output() canvasmousemove = new EventEmitter<MouseEvent>();
  @Output() canvasmouseout = new EventEmitter<MouseEvent>();
  @Output() canvasmouseover = new EventEmitter<MouseEvent>();
  @Output() canvasmouseup = new EventEmitter<MouseEvent>();
  @Output() canvasscroll = new EventEmitter<MouseEvent>();
  @Output() canvaswheel = new EventEmitter<MouseEvent>();

  ngAfterContentInit() {
    this.cachedItems = this.items.toArray();
    this.items.changes.subscribe(() => {
      this.cachedItems = this.items.toArray();
      this.isChanged = true;
    });
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    this.onInitDraw(context);
    this.onClear(context);
    this.onDraw(context);

    this.cachedItems.forEach((item, index, array) => {
      if (item == this) return;
      item.draw(context);
    });

    context.restore();

    //this.isChanged = false;
  }

  public animate(elapsedTime: number): void {
    if (this.isAnimated) {
      this.onAnimate(elapsedTime);

      this.cachedItems.forEach((item, index, array) => {
        if (item == this) return;
        item.animate(elapsedTime);
      });
    }
  }

  onInitDraw(context: CanvasRenderingContext2D): void {
    context.translate(this.left, this.top);
    context.rect(0, 0, this.width, this.height);
    context.clip();

    context.fillStyle = this.background;
    context.strokeStyle = this.foreground;
  }

  onClear(context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = this.background;
    context.fill();
  }

  abstract onDraw(context: CanvasRenderingContext2D): void;

  abstract onAnimate(elapsedTime: number): void;

  contains(x: number, y: number): boolean {
    let xdiff = x - this.left;
    let ydiff = y - this.top;
    return xdiff > 0 && ydiff > 0 && xdiff < this.width && ydiff < this.height;
  }

  raiseclick(event: MouseEvent) {
    this.canvasclick.emit(event);
  }
  raisedblclick(event: MouseEvent) {
    this.canvasdblclick.emit(event);
  }
  raisedrag(event: MouseEvent) {
    this.canvasdrag.emit(event);
  }
  raisedragend(event: MouseEvent) {
    this.canvasdragend.emit(event);
  }
  raisedragenter(event: MouseEvent) {
    this.canvasdragenter.emit(event);
  }
  raisedragleave(event: MouseEvent) {
    this.canvasdragleave.emit(event);
  }
  raisedragover(event: MouseEvent) {
    this.canvasdragover.emit(event);
  }
  raisedragstart(event: MouseEvent) {
    this.canvasdragstart.emit(event);
  }
  raisedrop(event: MouseEvent) {
    this.canvasdrop.emit(event);
  }
  raisemousedown(event: MouseEvent) {
    this.canvasmousedown.emit(event);
  }
  raisemousemove(event: MouseEvent) {
    this.canvasmousemove.emit(event);
  }
  raisemouseout(event: MouseEvent) {
    this.canvasmouseout.emit(event);
  }
  raisemouseover(event: MouseEvent) {
    this.canvasmouseover.emit(event);
  }
  raisemouseup(event: MouseEvent) {
    this.canvasmouseup.emit(event);
  }
  raisescroll(event: MouseEvent) {
    this.canvasscroll.emit(event);
  }
  raisewheel(event: MouseEvent) {
    this.canvaswheel.emit(event);
  }

}

export function CanvasComponent(annotation?: any) {
  return function (target: Function) {
    if (!annotation) {
      annotation = {};
    }

    if (!Object.hasOwnProperty('template')) {
      annotation.template = '<ng-content></ng-content>';
    }
    if (!Object.hasOwnProperty('providers')) {
      annotation.providers = [];
    }
    annotation.providers.push(provide(CanvasElement, { useExisting: forwardRef(() => target) }));

    var _ = window['_'];

    function meta(name, p, t) {
      var pmeta = Reflect.getMetadata(name, p);
      var tmeta = Reflect.getMetadata(name, t);
      Reflect.defineMetadata(name, _.merge({}, pmeta, tmeta), target);
    }

    var parentTarget = Object.getPrototypeOf(target.prototype).constructor;

    //meta('annotations', parentTarget, target);
    //meta('design:paramtypes', parentTarget, target);
    meta('propMetadata', parentTarget, target);
    //meta('parameters', parentTarget, target);

    var metadata = new ComponentMetadata(annotation);
    Reflect.defineMetadata('annotations', [metadata], target);
  }
}