export class Geometry {
  static contains(item: { left: number, top: number, width: number, height: number, rotation?: number }, x: number, y: number) {
    let xdiff = x - item.left;
    let ydiff = y - item.top;
    let width = (item.rotation % 2 == 0) ? item.width: item.height;
    let height = (item.rotation % 2 == 0) ? item.height: item.width;
    return xdiff >= 0 && ydiff >= 0 && xdiff < width && ydiff < height;
  }
   
}