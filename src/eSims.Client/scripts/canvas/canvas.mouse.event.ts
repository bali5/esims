import { CanvasElement } from './canvas.element'
import { Canvas } from './canvas'


export class CanvasMouseEvent {
  public canvas: Canvas;
  public element: CanvasElement;
  public elementX: number;
  public elementY: number;
  public event: MouseEvent;
}