import { Component, Input, Injector, forwardRef, ElementRef } from '@angular/core';
import { Inherit } from './../common/inherit';
import { CanvasComponent, CanvasElement } from './canvas.element'

@CanvasComponent({
  selector: 'esc-border'
})
export class CanvasBorder extends CanvasElement {
  @Input() strokeWidth: number = 5;
  @Input() strokeDash: number[] = null;
  @Input() pixelPerMilliSeconds: number = 0.05;

  private offset: number = 0;

  constructor(element: ElementRef) {
    super(element);
    this.isAnimated = true;
  }

  onDraw(context: CanvasRenderingContext2D): void {
    context.lineWidth = this.strokeWidth;

    if (this.strokeDash) {
      context.lineCap = 'round';
      context.setLineDash(this.strokeDash);
      context.lineDashOffset = -((0.5 + this.offset) | 0);
    }

    context.strokeStyle = this.foreground;

    var half = Math.ceil(this.strokeWidth / 2);
    context.strokeRect(half, half, this.width - half * 2, this.height - half * 2);
  }

  onAnimate(elapsedTime: number): void {
    if (this.strokeDash) {
      var strokeLength = 0;
      this.strokeDash.forEach((n) => strokeLength += n);

      this.offset += elapsedTime * this.pixelPerMilliSeconds;
      while (this.offset >= strokeLength) {
        this.offset -= strokeLength;
      }
    }

  }

}
