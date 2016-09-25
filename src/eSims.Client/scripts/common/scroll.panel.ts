import { Component, Input, ViewChild, ElementRef, DoCheck, EventEmitter, AfterViewInit, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'es-scroll-panel',
  template: `
    <div #view class="fill">
      <div #content class="scroll-content" [style.top.px]="-scrollTop">
        <ng-content></ng-content>
      </div>
      <div class="scroll-vertical-bar">
        <div class="scroll-vertical-thumb" [style.top.px]="scrollTop / (contentHeight - contentVisible) * (contentVisible - verticalThumbSize)" [style.height.px]="verticalThumbSize" (mousedown)="onMouseDown($event)"></div>
      </div>
    </div>
  `
})
export class ScrollPanel implements DoCheck {
  @ViewChild('view') view: ElementRef;
  @ViewChild('content') content: ElementRef;
  private contentHeight: number;
  private contentVisible: number;
  private scrollTop: number = 0;
  private verticalThumbSize: number;
  @HostBinding('class.dragging') isDragging: boolean = false;

  constructor(private element: ElementRef) { }

  ngDoCheck() {
    this.update();
  }

  update(force: boolean = false) {
    let contentVisible = this.view.nativeElement.offsetHeight;
    let contentHeight = this.content.nativeElement.offsetHeight;

    if (force || (this.contentVisible != contentVisible || this.contentHeight != contentHeight)) {
      this.verticalThumbSize = Math.min(contentVisible, Math.max(30, contentVisible * contentVisible / contentHeight));

      this.contentVisible = contentVisible;
      this.contentHeight = contentHeight;
    }
  }
  
  private windowDragMouseUpFunction = null;
  private windowDragMouseMoveFunction = null;

  /** Start for listening for mouse move */
  onMouseDown(e: MouseEvent) {
    if (!this.windowDragMouseUpFunction) {
      this.windowDragMouseUpFunction = (event) => { this.windowDragMouseUp(event) };
      window.addEventListener('mouseup', this.windowDragMouseUpFunction);
    }
    if (!this.windowDragMouseMoveFunction) {
      this.windowDragMouseMoveFunction = (event) => { this.windowDragMouseMove(event) };
      window.addEventListener('mousemove', this.windowDragMouseMoveFunction);
    }
    this.isDragging = true;
  }

  /** Stop dragging */
  windowDragMouseUp(e) {
    if (this.windowDragMouseUpFunction) {
      window.removeEventListener('mouseup', this.windowDragMouseUpFunction);
      this.windowDragMouseUpFunction = null;
    }
    if (this.windowDragMouseMoveFunction) {
      window.removeEventListener('mousemove', this.windowDragMouseMoveFunction);
      this.windowDragMouseMoveFunction = null;
    }

    this.lastScreenY = null;
    this.isDragging = false;
  }

  private lastScreenY;

  /** Move panel with mouse move */
  windowDragMouseMove(e: MouseEvent) {
    if (this.lastScreenY) {
      this.modScrollTop(-(this.lastScreenY - e.screenY) / (this.contentVisible / this.contentHeight));
    }
    this.lastScreenY = e.screenY;
  }

  @HostListener('mousewheel', ['$event'])
  /** Move panel with the wheel */
  onMouseScroll(e: MouseEvent) {
    /** compatibility */
    var delta = ((<any>e).wheelDelta || -e.detail);
    this.modScrollTop(-delta);
  }

  modScrollTop(value) {
    let scrollTop = this.scrollTop + value;
    if (scrollTop < 0) {
      scrollTop = 0;
    } else if (scrollTop > this.contentHeight - this.contentVisible) {
      scrollTop = this.contentHeight - this.contentVisible;
    }
    this.scrollTop = scrollTop;
  }

}
