import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeLast,
  takeUntil,
  tap,
} from 'rxjs';
import {
  MovieResult,
  MultiResult,
  PersonResult,
  TvResult,
} from 'src/app/core/model/search';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSearchComponent implements OnInit {
  @ViewChild('headerSearch') headerSearch!: ElementRef;
  searchControl = new FormControl('');
  showDropdown = false;
  isNavigate = false;

  results$: Observable<{
    movie: MovieResult | null;
    tv: TvResult | null;
    person: PersonResult | null;
    multi: MultiResult[];
  }> = of({ movie: null, tv: null, person: null, multi: [] });

  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query) {
          return of({ multi: [], movie: null, tv: null, person: null });
        }

        return combineLatest([
          this.searchService.searchMulti(query),
          this.searchService
            .searchMovie(query)
            .pipe(map((res) => res.results[0] || null)),
          this.searchService
            .searchTV(query)
            .pipe(map((res) => res.results[0] || null)),
          this.searchService
            .searchPerson(query)
            .pipe(map((res) => res.results[0] || null)),
        ]).pipe(
          map(([multiRes, movie, tv, person]) => ({
            multi: multiRes.results,
            movie,
            tv,
            person,
          }))
        );
      }),
      tap(() => {
        if (this.isNavigate) {
          this.showDropdown = false;
          this.isNavigate = false;
        } else this.showDropdown = true;

        this.cdr.markForCheck();
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  focusSearch(): void {
    this.headerSearch.nativeElement.focus();
  }

  onInputFocus(): void {
    if (this.searchControl.value) {
      this.showDropdown = true;
      this.cdr.markForCheck();
    }
  }

  onInputBlur(): void {
    setTimeout(() => {
      this.hideDropdown();
    }, 150);
  }

  onEnterPress(): void {
    const query = this.searchControl.value;
    if (query && query.trim()) {
      this.goToResultSearch(query);
    }
  }

  hideDropdown(): void {
    this.showDropdown = false;
    this.cdr.markForCheck();
  }

  goToResultSearch(query: string): void {
    this.isNavigate = true;
    query = query ?? this.searchControl.value;
    this.searchControl.setValue(query);
    this.headerSearch.nativeElement.blur();
    this.router.navigate(['home/search', query]);
  }
}
