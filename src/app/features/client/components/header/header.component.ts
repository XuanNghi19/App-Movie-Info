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
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { DropdownItem } from 'src/app/shared/types/dropdown';

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

  dropdownItemsMap: Record<string, DropdownItem[]> = {
    movies: [
      { label: 'Popular', route: '/' },
      { label: 'Now Playing', route: '/' },
      { label: 'Upcoming', route: '/' },
      { label: 'Top Rated', route: '/' },
    ],
    tv: [
      { label: 'Popular', route: '/' },
      { label: 'Airting Today', route: '/' },
      { label: 'On TV', route: '/' },
      { label: 'Top Rated', route: '/' },
    ],
    people: [{ label: 'Popular People', route: 'client/people/popular-people' }],
    more: [
      { label: 'Discussions', route: '/' },
      { label: 'Leaderboard', route: '/' },
    ],
  };

  constructor(private dropdownService: DropdownService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  onDropdownTrigger(event: MouseEvent, key: string) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    const position = {
      top: rect.bottom,
      left: rect.left,
    };

    const items = this.dropdownItemsMap[key];

    this.dropdownService.show(position, items);
  }
onDropdownHide() {
  this.dropdownService.hide();
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
