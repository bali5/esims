import { Component, Input, Injector, forwardRef, ViewChild } from '@angular/core';
import { Inherit } from './../common/inherit';
import { CanvasComponent, CanvasElement } from './canvas.element'

@CanvasComponent({
  selector: 'esc-image'
})
export class CanvasImage extends CanvasElement {
  @Input() src: string;
  private image: HTMLImageElement;

  onPropertyChange(propertyName: string, newValue: any, oldValue: any) {
    super.onPropertyChange(propertyName, newValue, oldValue);

    if (propertyName == 'src') {
      this.image = new HTMLImageElement();
      this.image.src = this.src;
    }
  }

  onDraw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, 0, 0, this.width, this.height);
  }

  onAnimate(elapsedTime: number): void {
  }

}
