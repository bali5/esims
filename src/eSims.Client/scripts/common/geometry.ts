export class Geometry {
  static contains(item: { left: number, top: number, width: number, height: number }, x: number, y: number) {
    let xdiff = x - item.left;
    let ydiff = y - item.top;
    return xdiff >= 0 && ydiff >= 0 && xdiff < item.width && ydiff < item.height;
  }
   
}