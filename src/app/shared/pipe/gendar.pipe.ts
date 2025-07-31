import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gendar',
})
export class GendarPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Female';
      case 2:
        return 'Male';
      case 3:
        return 'Non-binary';
      default:
        return 'Unknown';
    }
  }
}
