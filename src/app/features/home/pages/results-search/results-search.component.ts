import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  finalize,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SearchService } from 'src/app/core/services/search.service';
import { DEFAULT_IMG } from 'src/app/core/utils/constants';

interface PaginationInfo {
  totalPages: number;
  totalResults: number;
  currentPage: number;
}

@Component({
  selector: 'app-results-search',
  templateUrl: './results-search.component.html',
  styleUrls: ['./results-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsSearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  selectedCategory = 'all';
  currentPage = 1;

  searchResults$: Observable<any> = new Observable();
  categoryCounts$: Observable<{
    movies: number;
    tvShows: number;
    people: number;
  }> = new Observable();
  paginationInfo$: Observable<PaginationInfo> = new Observable();

  // Expose Math to template
  Math = Math;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.searchQuery = params['query'] || '';
      this.currentPage = 1; // Reset về trang 1 khi có query mới
      this.loadSearchResults();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSearchResults(): void {
    if (!this.searchQuery) {
      this.setEmptyResults();
      return;
    }
    this.loadingService.show('overlay');

    const searchObservables = [
      this.searchService.searchMovie(this.searchQuery, this.currentPage),
      this.searchService.searchTV(this.searchQuery, this.currentPage),
      this.searchService.searchPerson(this.searchQuery, this.currentPage),
    ];

    combineLatest(searchObservables)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loadingService.hide('overlay'))
      )
      .subscribe(([movieRes, tvRes, personRes]) => {
        const results = {
          movies: movieRes.results || [],
          tvShows: tvRes.results || [],
          people: personRes.results || [],
        };

        const counts = {
          movies: movieRes.total_results || 0,
          tvShows: tvRes.total_results || 0,
          people: personRes.total_results || 0,
        };

        // Xác định pagination info dựa trên category được chọn
        let paginationInfo: PaginationInfo;
        switch (this.selectedCategory) {
          case 'movies':
            paginationInfo = {
              totalPages: movieRes.total_pages || 1,
              totalResults: movieRes.total_results || 0,
              currentPage: this.currentPage,
            };
            break;
          case 'tvShows':
            paginationInfo = {
              totalPages: tvRes.total_pages || 1,
              totalResults: tvRes.total_results || 0,
              currentPage: this.currentPage,
            };
            break;
          case 'people':
            paginationInfo = {
              totalPages: personRes.total_pages || 1,
              totalResults: personRes.total_results || 0,
              currentPage: this.currentPage,
            };
            break;
          default: // 'all'
            const maxPages = Math.max(
              movieRes.total_pages || 1,
              tvRes.total_pages || 1,
              personRes.total_pages || 1
            );
            paginationInfo = {
              totalPages: maxPages,
              totalResults: counts.movies + counts.tvShows + counts.people,
              currentPage: this.currentPage,
            };
        }

        this.searchResults$ = new Observable((observer) =>
          observer.next(results)
        );
        this.categoryCounts$ = new Observable((observer) =>
          observer.next(counts)
        );
        this.paginationInfo$ = new Observable((observer) =>
          observer.next(paginationInfo)
        );

        this.cdr.markForCheck();
      });
  }

  private setEmptyResults(): void {
    const emptyResults = { movies: [], tvShows: [], people: [] };
    const emptyCounts = { movies: 0, tvShows: 0, people: 0 };
    const emptyPagination = { totalPages: 1, totalResults: 0, currentPage: 1 };

    this.searchResults$ = new Observable((observer) =>
      observer.next(emptyResults)
    );
    this.categoryCounts$ = new Observable((observer) =>
      observer.next(emptyCounts)
    );
    this.paginationInfo$ = new Observable((observer) =>
      observer.next(emptyPagination)
    );

    this.cdr.markForCheck();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1; // Reset về trang 1 khi đổi category
    this.loadSearchResults(); // Load lại data với category mới
  }

  loadPage(page: number): void {
    this.currentPage = page;
    this.loadSearchResults();

    // Scroll to top khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDisplayedResults(results: any): any[] {
    switch (this.selectedCategory) {
      case 'movies':
        return results.movies;
      case 'tvShows':
        return results.tvShows;
      case 'people':
        return results.people;
      default:
        return [...results.movies, ...results.tvShows, ...results.people];
    }
  }

  getItemType(item: any): string {
    if (item.title) return 'movie';
    if (item.name && item.first_air_date) return 'tv';
    if (item.name && item.known_for_department) return 'person';
    return 'unknown';
  }

  getItemTitle(item: any): string {
    return item.title || item.name || 'Unknown';
  }

  getItemSubtitle(item: any): string {
    const type = this.getItemType(item);
    switch (type) {
      case 'movie':
        return item.release_date
          ? new Date(item.release_date).getFullYear().toString()
          : '';
      case 'tv':
        return item.first_air_date
          ? new Date(item.first_air_date).getFullYear().toString()
          : '';
      case 'person':
        return item.known_for_department || '';
      default:
        return '';
    }
  }

  getItemImage(item: any): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w200';
    return item.poster_path || item.profile_path
      ? `${baseUrl}${item.poster_path || item.profile_path}`
      : DEFAULT_IMG;
  }

  goToDetails(type: string = 'movie', id: number): void {
    switch (type) {
      case 'person':
        this.router.navigate([`/people/details/${id}`]);
        break;
      case 'movie':
        this.router.navigate([`/movie/details/movie/${id}`]);
        break;
      case 'tv':
        this.router.navigate([`/movie/details/tv/${id}`]);
        break;
    }
  }
}
