import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    value = parseFloat(((value - 273.15) * 1.8 + 32).toFixed(2));
    return value;
  }
}
