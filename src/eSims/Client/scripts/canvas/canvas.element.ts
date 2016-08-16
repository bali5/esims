import { Input, Directive, Component } from '@angular/core';
import { ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'esc-element',
  template: '<ng-content></ng-content>'
})
export abstract class CanvasElement implements AfterContentInit {
  static inputs: string[] = [
    'left',
    'top',
    'width',
    'height',
    'foreground',
    'background',
    'isAnimated',
  ];

  @ContentChildren(CanvasElement) items: QueryList<CanvasElement>;

  @Input() left: number;
  @Input() top: number;
  @Input() width: number;
  @Input() height: number;

  @Input() foreground: string | CanvasGradient | CanvasPattern = '#000000';
  @Input() background: string | CanvasGradient | CanvasPattern = 'transparent';

  @Input() isAnimated: boolean = false;
  public isChanged: boolean = true;

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
