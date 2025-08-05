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
  ChangeDetectionStrategy,
} from '@angular/core';
import { LanguageOption } from 'src/app/core/model/language';
import { DropdownService } from 'src/app/core/services/dropdown.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { DropdownItem } from 'src/app/shared/types/dropdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  showLanguageDropdown = false;
  dropdownTop = 0;
  dropdownLeft = 0;
  languages: LanguageOption[] = [];

  @ViewChild('language') language!: ElementRef;

  dropdownItemsMap: Record<string, DropdownItem[]> = {
    movies: [
      { label: 'Popular', route: 'movie/movie/popular' },
      { label: 'Now Playing', route: 'movie/movie/now_playing' },
      { label: 'Upcoming', route: 'movie/movie/upcoming' },
      { label: 'Top Rated', route: 'movie/movie/top_rated' },
    ],
    tv: [
      { label: 'Popular', route: 'movie/tv/popular' },
      { label: 'Airting Today', route: 'movie/tv/airing_today' },
      { label: 'On TV', route: 'movie/tv/on_the_air' },
      { label: 'Top Rated', route: 'movie/tv/top_rated' },
    ],
    people: [{ label: 'Popular People', route: '/people/popular' }],
    more: [
      { label: 'Discussions', route: '/' },
      { label: 'Leaderboard', route: '/' },
    ],
    add: [
      { label: 'Thêm phim mới', route: '/' },
      { label: 'Thêm chương trình TV mới', route: '/' },
    ],
  };

  constructor(
    private dropdownService: DropdownService,
    private languageService: LanguageService
  ) {}
  ngAfterViewInit(): void {
    this.setDropdownPosition();
  }

  ngOnInit(): void {
    this.languageService
      .getSupportedLanguages()
      .subscribe((langs) => {
        this.languages = langs;
        localStorage.setItem('languages', JSON.stringify(langs));
      });
  }

  onDropdownTrigger(event: MouseEvent, key: string) {
    this.showLanguageDropdown = false;
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
    this.showLanguageDropdown = false;
  }

  focusSearch(): void {
    this.onDropdownHide();
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

  toggleLanguageDropdown() {
    this.onDropdownHide();
    this.showLanguageDropdown = !this.showLanguageDropdown;
    if (this.showLanguageDropdown) {
      this.setDropdownPosition();
    }
  }

  setDropdownPosition() {
    const rect = this.language.nativeElement.getBoundingClientRect();
    this.dropdownTop = rect.bottom + window.scrollY + 8; // cách nút 8px
    this.dropdownLeft = rect.left + window.scrollX;
  }
}
