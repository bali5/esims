import 'reflect-metadata';

import { Input, Output, EventEmitter, Directive, Component, ComponentMetadata, provide, forwardRef } from '@angular/core';
import { ContentChildren, QueryList, AfterContentInit } from '@angular/core';

//import * as _ from 'lodash';

@CanvasComponent({
  selector: 'esc-element'
})
export abstract class CanvasElement implements AfterContentInit {
  @ContentChildren(CanvasElement) items: QueryList<CanvasElement>;

  @Input() left: number;
  @Input() top: number;
  @Input() width: number;
  @Input() height: number;

  @Input() foreground: string | CanvasGradient | CanvasPattern = '#000000';
  @Input() background: string | CanvasGradient | CanvasPattern = 'transparent';

  @Input() isAnimated: boolean = false;

  public isChanged: boolean = true;

  @Output() onclick = new EventEmitter<KeyboardEvent>();
  @Output() ondblclick = new EventEmitter<KeyboardEvent>();

  ngAfterContentInit() {
    this.items.changes.subscribe(() => {
      this.isChanged = true;
    });
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    this.onInitDraw(context);
    this.onClear(context);
    this.onDraw(context);

    this.items.forEach((item, index, array) => {
      if (item == this) return;
      item.draw(context);
    });

    context.restore();

    //this.isChanged = false;
  }

  public animate(elapsedTime: number): void {
    if (this.isAnimated) {
      this.onAnimate(elapsedTime);

      this.items.forEach((item, index, array) => {
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