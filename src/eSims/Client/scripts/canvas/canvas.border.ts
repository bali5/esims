import { Directive, Input, Injector } from '@angular/core';
//import { ExtendedDirective } from './../common/extended.directive';
import { CanvasElement } from './canvas.element'

@Directive({
  selector: 'esc-border',
  inputs: CanvasElement.inputs
})
export class CanvasBorder extends CanvasElement {
  @Input() strokeWidth: number = 5;
  @Input() strokeDash: number[] = null;
  @Input() time: number = 5000;

  private offset: number = 0;

  constructor(private injector: Injector) {
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
