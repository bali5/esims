import { Input, Directive } from '@angular/core';

export abstract class CanvasElement {
  static inputs: string[] = [
    'left',
    'top',
    'width',
    'height',
    'foreground',
    'background',
    'isAnimated',
  ];

  @Input() left: number;
  @Input() top: number;
  @Input() width: number;
  @Input() height: number;

  @Input() foreground: string | CanvasGradient | CanvasPattern = '#000000';
  @Input() background: string | CanvasGradient | CanvasPattern = 'transparent';

  @Input() isAnimated: boolean = false;
  public isChanged: boolean = true;

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    this.onInitDraw(context);
    this.onClear(context);
    this.onDraw(context);

    context.restore();

    //this.isChanged = false;
  }

  public animate(context: CanvasRenderingContext2D, elapsedTime: number): void {
    if (this.isAnimated) {
      this.onAnimate(elapsedTime);
      this.draw(context);
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

  abstract onDraw(context: CanvasRenderingContext2D) : void;

  abstract onAnimate(elapsedTime: number): void;
}
