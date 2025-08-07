import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() value = 0;
  @Input() name: string = '';
  @Output() valueChange = new EventEmitter<number>();
  isOpen = false;
  tickMarks = Array.from({ length: 11 }, (_, i) => i * 10);
  showConfirm = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}


  onSliderChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = +input.value;
    this.valueChange.emit(this.value);
  }

  clearRating() {
    this.value = 0;
    this.valueChange.emit(this.value);
  }

  getSliderBackground(): string {
    return `linear-gradient(to right, #2e86de ${this.value}%, #ccc ${this.value}%)`;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
  }
}
