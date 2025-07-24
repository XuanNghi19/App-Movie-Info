import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (!value || value === 0) return '--';
    
    // Chuyển thang 10 -> phần trăm & làm tròn
    const percent = Math.round(value * 10); // 7.271 -> 72.71 -> 73
    return `${percent}%`;
  }

}
