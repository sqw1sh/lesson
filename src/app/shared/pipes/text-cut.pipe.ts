import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCut',
})
export class TextCutPipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 100 ? value.substring(0, 100) + '...' : value;
  }
}
