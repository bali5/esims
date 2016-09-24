import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(value: number, decimal: string): string {
    let dec = parseInt(decimal);
    if (isNaN(dec)) {
      dec = 2;
    }

    let pow = Math.pow(10, dec)

    value = Math.round(value * pow) / pow;

    let strValue = value.toString();

    if (dec > 0) {
      let zeroes = dec - ((value - Math.floor(value)).toString().length - 2);
      for (let i = 0; i < zeroes; i++) {
        strValue += '0';
      }
    }

    return strValue;
  }
}

@Pipe({ name: 'min' })
export class MinPipe implements PipeTransform {
  transform(value: number, value2: string): number {
    let v2 = parseFloat(value2);
    if (isNaN(v2)) {
      return value;
    }

    return Math.min(value, v2);
  }
}

@Pipe({ name: 'max' })
export class MaxPipe implements PipeTransform {
  transform(value: number, value2: string): number {
    let v2 = parseFloat(value2);
    if (isNaN(v2)) {
      return value;
    }

    return Math.max(value, v2);
  }
}

@Pipe({ name: 'abs' })
export class AbsPipe implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value);
  }
}

