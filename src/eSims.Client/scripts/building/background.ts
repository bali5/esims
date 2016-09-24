import { Input, Output, Injector, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CanvasComponent, CanvasElement } from './../canvas/canvas.element'
import { CanvasBorder } from './../canvas/canvas.border'
import { CanvasMouseEvent } from './../canvas/canvas.mouse.event'

@CanvasComponent({
  selector: 'es-background'
})
export class BackgroundCanvasElement extends CanvasElement {
  constructor(element: ElementRef) {
    super(element);
  }

  onDraw(context: CanvasRenderingContext2D): void {
    context.save();

    context.globalAlpha = 0.25;

    context.beginPath();
    context.strokeStyle = this.foreground;
    context.lineWidth = 3;

    let limit = this.height + 35;
    for (let i = 0; i < limit; i += 35) {
      this.drawLine(context, i);
    }
    context.stroke();

    context.restore();
  }

  drawLine(context: CanvasRenderingContext2D, yAxis: number) {
    let unit = 10;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    context.moveTo(0, yAxis);

    let limit = this.width + 10;
    // Loop to draw segments
    for (let x = 0; x <= limit; x += 10) {
      //y = Math.random();
      context.lineTo(x, unit + yAxis);
      unit *= -1;
    }
  }

  onAnimate(elapsedTime: number): void {
  }

}
