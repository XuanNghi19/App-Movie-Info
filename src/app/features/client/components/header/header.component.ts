import {
  AfterViewInit,
  Component,
  ElementRef,
  Host,
  HostListener,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isDropdownOpen: boolean = false;
  isHeaderHidden: boolean = false;
  private lastScrollTop = 0;

  @ViewChild('movies') movies!: ElementRef;
  @ViewChild('tvShows') tvShows!: ElementRef;
  @ViewChild('people') people!: ElementRef;
  @ViewChild('more') more!: ElementRef;

  @Output() focusSearchEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  focusSearch(): void {
    this.focusSearchEvent.emit();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    this.isHeaderHidden =
      currentScroll > this.lastScrollTop && currentScroll > 80;
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
}
