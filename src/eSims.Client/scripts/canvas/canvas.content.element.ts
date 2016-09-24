import { Component, Input, Injector, forwardRef, ViewChild } from '@angular/core';
import { Inherit } from './../common/inherit';
import { CanvasComponent, CanvasElement } from './canvas.element'

@CanvasComponent({
  selector: 'esc-content'
})
export class CanvasContentElement extends CanvasElement {
  @Input() src: string;

  onDraw(context: CanvasRenderingContext2D): void {
  }

  onAnimate(elapsedTime: number): void {
  }

}
