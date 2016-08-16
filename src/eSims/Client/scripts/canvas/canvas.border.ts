import { Component, Input, Injector, provide, forwardRef } from '@angular/core';
import { Inherit } from './../common/inherit';
import { CanvasComponent, CanvasElement } from './canvas.element'

@CanvasComponent({
  selector: 'esc-border'
})
export class CanvasBorder extends CanvasElement {
  @Input() strokeWidth: number = 5;
  @Input() strokeDash: number[] = null;
  @Input() time: number = 10000;

  private offset: number = 0;

  constructor() {
    super();
    this.isAnimated = true;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.strokeWidth;

    if (this.strokeDash) {
      context.lineCap = 'round';
      context.setLineDash(this.strokeDash);
      context.lineDashOffset = -this.offset;
    }

    context.strokeStyle = this.foreground;

    var half = Math.ceil(this.strokeWidth / 2);
    context.strokeRect(half, half, this.width - half * 2, this.height - half * 2);
  }

  onAnimate(elapsedTime: number): void {
    if (this.strokeDash) {
      var length = this.width * 2 + this.height * 2;

      this.offset += length * elapsedTime / this.time;
      while (this.offset >= length) {
        this.offset -= length;
      }
    }

  }

}
