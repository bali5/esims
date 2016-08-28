import 'reflect-metadata';

import { ElementRef, Input, Output, EventEmitter, Directive, Component, ComponentMetadata, provide, forwardRef, OnChanges, SimpleChange, ViewChildren } from '@angular/core';
import { ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { CanvasMouseEvent } from './canvas.mouse.event'

//import * as _ from 'lodash';

@CanvasComponent({
  selector: 'esc-element'
})
export abstract class CanvasElement implements OnChanges, AfterViewInit {
  @ContentChildren(CanvasElement) contentItems: QueryList<CanvasElement>;
  @ViewChildren(CanvasElement) viewItems: QueryList<CanvasElement>;
  public cachedItems: CanvasElement[];

  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() width: number = 0;
  @Input() height: number = 0;

  @Input() foreground: string | CanvasGradient | CanvasPattern = '#000000';
  @Input() background: string | CanvasGradient | CanvasPattern = 'transparent';

  @Input() isAnimated: boolean = false;

  @Input() isHitTestVisible: boolean = true;
  @Input() isVisible: boolean = true;

  public isChanged: boolean = true;

  @Output() canvasclick = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdblclick = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdrag = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdragend = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdragenter = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdragleave = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdragover = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdragstart = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasdrop = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasmousedown = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasmousemove = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasmouseout = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasmouseover = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasmouseup = new EventEmitter<CanvasMouseEvent>();
  @Output() canvasscroll = new EventEmitter<CanvasMouseEvent>();
  @Output() canvaswheel = new EventEmitter<CanvasMouseEvent>();

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.viewItems.changes.subscribe(() => {
      this.updateCachedItems();
      this.isChanged = true;
    });
    this.contentItems.changes.subscribe(() => {
      this.updateCachedItems();
      this.isChanged = true;
    });
    this.updateCachedItems();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    for (let propName in changes) {
      let chng = changes[propName];
      this.onPropertyChange(propName, chng.currentValue, chng.previousValue);
    }
  }

  onPropertyChange(propertyName: string, newValue: any, oldValue: any) {
  }

  updateCachedItems() {
    let array: CanvasElement[] = [];
    this.contentItems.forEach((item) => {
      if (item != this) {
        array.push(item);
      }
    });
    this.viewItems.forEach((item) => {
      if (item != this) {
        array.push(item);
      }
    });
    this.cachedItems = array;
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (!this.isVisible) {
      return;
    }

    context.save();

    this.onInitDraw(context);
    this.onClear(context);
    this.onDraw(context);

    this.cachedItems.forEach((item, index, array) => {
      item.draw(context);
    });

    context.restore();

    //this.isChanged = false;
  }

  public animate(elapsedTime: number): void {
    if (this.isAnimated) {
      this.onAnimate(elapsedTime);

      this.cachedItems.forEach((item, index, array) => {
        item.animate(elapsedTime);
      });
    }
  }

  onInitDraw(context: CanvasRenderingContext2D): void {
    context.translate(this.left, this.top);
    context.rect(0, 0, this.width, this.height);
    //Memory hog in chrome
    //context.clip();

    context.fillStyle = this.background;
    context.strokeStyle = this.foreground;
  }

  onClear(context: CanvasRenderingContext2D): void {
    //context.clearRect(0, 0, this.width, this.height);
    //context.fillStyle = this.background;
    //context.fill();
  }

  abstract onDraw(context: CanvasRenderingContext2D): void;

  abstract onAnimate(elapsedTime: number): void;

  contains(x: number, y: number): boolean {
    if (!this.isHitTestVisible) return false;

    let xdiff = x - this.left;
    let ydiff = y - this.top;
    return xdiff >= 0 && ydiff >= 0 && xdiff < this.width && ydiff < this.height;
  }

  raiseclick(event: CanvasMouseEvent) {
    this.canvasclick.emit(event);
  }
  raisedblclick(event: CanvasMouseEvent) {
    this.canvasdblclick.emit(event);
  }
  raisedrag(event: CanvasMouseEvent) {
    this.canvasdrag.emit(event);
  }
  raisedragend(event: CanvasMouseEvent) {
    this.canvasdragend.emit(event);
  }
  raisedragenter(event: CanvasMouseEvent) {
    this.canvasdragenter.emit(event);
  }
  raisedragleave(event: CanvasMouseEvent) {
    this.canvasdragleave.emit(event);
  }
  raisedragover(event: CanvasMouseEvent) {
    this.canvasdragover.emit(event);
  }
  raisedragstart(event: CanvasMouseEvent) {
    this.canvasdragstart.emit(event);
  }
  raisedrop(event: CanvasMouseEvent) {
    this.canvasdrop.emit(event);
  }
  raisemousedown(event: CanvasMouseEvent) {
    this.canvasmousedown.emit(event);
  }
  raisemousemove(event: CanvasMouseEvent) {
    this.canvasmousemove.emit(event);
  }
  raisemouseout(event: CanvasMouseEvent) {
    this.canvasmouseout.emit(event);
  }
  raisemouseover(event: CanvasMouseEvent) {
    this.canvasmouseover.emit(event);
  }
  raisemouseup(event: CanvasMouseEvent) {
    this.canvasmouseup.emit(event);
  }
  raisescroll(event: CanvasMouseEvent) {
    this.canvasscroll.emit(event);
  }
  raisewheel(event: CanvasMouseEvent) {
    this.canvaswheel.emit(event);
  }

  getCanvasPosition(): { x: number, y: number } {
    var parents = this.getParents();

    var result = { x: 0, y: 0 };

    for (let parent of parents) {
      result.x += parent.left;
      result.y += parent.top;
    }

    return result;
  }

  getParent(): CanvasElement {
    let element = <HTMLElement>this.element.nativeElement;
    return null;
  }

  getParents(): CanvasElement[] {
    let parent = this.getParent();
    if (parent) {
      let parents = parent.getParents();
      parents.push(parent);
      return parents;
    } else {
      return [];
    }
  }

}

export function CanvasComponent(annotation?: any) {
  return function (target: Function) {
    if (!annotation) {
      annotation = {};
    }

    if (!annotation.hasOwnProperty('template') && !annotation.hasOwnProperty('templateUrl')) {
      annotation.template = '<ng-content></ng-content>';
    }
    if (!annotation.hasOwnProperty('providers')) {
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