import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'es-border',
  template: '<canvas #canvas></canvas>',
})
export class Border implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    window.setInterval(() => this.draw(), 20);
  }

  offset: number = 0;

  draw() {
    var c = <HTMLCanvasElement>this.canvas.nativeElement;
    var ctx = c.getContext('2d');

    var w = c.width = this.element.nativeElement.offsetWidth;
    var h = c.height = this.element.nativeElement.offsetHeight;

    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
    ctx.setLineDash([10, 15]);
    ctx.lineDashOffset = -this.offset;
    ctx.strokeRect(3, 3, w - 6, h - 6);

    this.offset++;
    if (this.offset > 50) {
      this.offset = 0;
    }
  }

}
