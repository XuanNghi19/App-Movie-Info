import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByKeyDesc'
})
export class SortByKeyDescPipe implements PipeTransform {

  transform(value: any): any {
    let tmp =  Object.entries(value)
      .sort((a, b) => +b[0] - +a[0])
      .map(([k, v]) => ({ key: k, value: v }));
    return tmp;
  }
}
