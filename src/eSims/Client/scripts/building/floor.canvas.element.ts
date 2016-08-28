import { Input, Output, Injector, provide, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CanvasComponent, CanvasElement } from './../canvas/canvas.element'
import { CanvasBorder } from './../canvas/canvas.border'
import { CanvasMouseEvent } from './../canvas/canvas.mouse.event'

@CanvasComponent({
  selector: 'es-floor-canvas',
  templateUrl: 'views/building/floor-canvas-element.html',
})
export class FloorCanvasElement extends CanvasElement {
  public selectLeft: number = 0;
  public selectTop: number = 0;
  public selectWidth: number = 0;
  public selectHeight: number = 0;
  private cellSize: number = 0;

  private _rotate: number = 0;
  get rotate(): number {
    return this._rotate;
  }
  set rotate(value: number) {
    if ((this._rotate - value) % 2 != 0) {
      let buf = this.selectWidth;
      this.selectWidth = this.selectHeight;
      this.selectHeight = buf;
    }

    this._rotate = value;
  }

  @ViewChild('select') select: CanvasBorder;

  constructor(element: ElementRef) {
    super(element);
    this.isAnimated = true;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.canvasmousemove.subscribe((e) => this.onMouseMove(e));
    this.canvaswheel.subscribe((e) => this.onWheel(e));
  }

  private mouseMoveEvent: CanvasMouseEvent;

  onDraw(context: CanvasRenderingContext2D): void {
    let cellSize = this.cellSize = this.width / 16;
    let stroke = Math.max(1, Math.floor(cellSize * 0.8 * 0.05));
    let tokenSize = cellSize * 0.8 - stroke;
    let margin = (cellSize - tokenSize) / 2;
    tokenSize = Math.round(tokenSize);

    if (this.selectWidth && this.selectHeight) {

      context.strokeStyle = 'purple';
      context.lineWidth = stroke;

      for (let x = 0; x < 16; x++) {
        for (let y = 0; y < 16; y++) {
          context.strokeRect(Math.floor(x * cellSize + margin), Math.floor(y * cellSize + margin), tokenSize, tokenSize);
        }
      }

      if (this.mouseMoveEvent) {
        let xs = Math.round(this.mouseMoveEvent.elementX / cellSize - this.selectWidth / 2);
        let ys = Math.round(this.mouseMoveEvent.elementY / cellSize - this.selectHeight / 2);

        if (xs < 0) {
          xs = 0;
        }
        if (ys < 0) {
          ys = 0;
        }
        if (xs > 16 - this.selectWidth) {
          xs = 16 - this.selectWidth;
        }
        if (ys >= 16 - this.selectHeight) {
          ys = 16 - this.selectHeight;
        }

        this.selectLeft = xs;
        this.selectTop = ys;

        context.strokeStyle = 'green';

        for (let x = 0; x < this.selectWidth; x++) {
          for (let y = 0; y < this.selectHeight; y++) {
            context.strokeRect(Math.floor((xs + x) * cellSize + margin), Math.floor((ys + y) * cellSize + margin), tokenSize, tokenSize);
          }
        }
      }
    }

  }

  onAnimate(elapsedTime: number): void {
  }

  onMouseMove(e: CanvasMouseEvent) {
    if (this.selectWidth && this.selectHeight) {
      this.mouseMoveEvent = e;
    } else {
      this.mouseMoveEvent = null;
    }
  }

  onWheel(e: CanvasMouseEvent) {
    if (this.selectWidth && this.selectHeight) {
      let delta = -Math.max(-1, Math.min(1, (<any>e.event).wheelDelta || -e.event.detail));
      this.rotate = (this.rotate + delta) % 4;
    }
  }

}
