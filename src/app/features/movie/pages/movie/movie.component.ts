import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieService } from '../../services/movie.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GenreResponse } from '../../models/movie';
import { MovieFilterComponent } from '../../components/movie-filter/movie-filter.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  title = '';
  params: any;
  private type$ = new BehaviorSubject<string>('movie');
  private tab$ = new BehaviorSubject<string>('popular');
  private page$ = new BehaviorSubject<number>(1);

  @ViewChild(MovieFilterComponent) movieFilter!: MovieFilterComponent;

  filmTabs: Record<string, string> = {
    popular: 'Popular Movies',
    now_playing: 'Now Playing Movies',
    upcoming: 'Upcoming Movies',
    top_rated: 'Top Rated Movies',
    discover: 'Discover Movies',
  };

  tvTabs: Record<string, string> = {
    popular: 'Popular TV Shows',
    airing_today: 'TV Shows Airing Today',
    on_the_air: 'Currently Airing TV Shows',
    top_rated: 'Top Rated TV Shows',
    discover: 'Discover TV Shows',
  };

  isDiscover = false;
  currentPage = 1;
  res: any;
  genres!: GenreResponse;
  genres$ = new BehaviorSubject<string>('movie');
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadingService.show('overlay');

    this.activatedRoute.paramMap.subscribe((params) => {
      if (this.movieFilter) {
        this.movieFilter.reset();
      }
      const tab = params.get('tab') ?? 'popular';
      const type = params.get('type') ?? 'movie';

      if (this.tab$.value !== tab) this.tab$.next(tab);
      if (this.type$.value !== type) this.type$.next(type);

      this.movieService
        .getGenres(this.type$.value, 'vi')
        .pipe(
          catchError((err) => {
            console.error('Genres API failed', err);
            return of({
              genres: [
                {
                  id: 0,
                  name: '',
                },
              ],
            });
          })
        )
        .subscribe((res) => {
          this.genres = res;
        });
    });

    combineLatest([this.type$, this.tab$, this.page$])
      .pipe(
        tap(() => {
          this.loadingService.show('overlay');
          this.isDiscover = false;
        }),
        switchMap(([type, tab, page]) => {
          if (this.isDiscover) {
            return EMPTY;
          }

          let main$: Observable<any> =
            type === 'movie'
              ? this.movieService.getMovie(page, tab)
              : this.movieService.getTv(page, tab);

          return main$.pipe(
            catchError((err) => {
              console.error('Main API failed', err);
              return of(null);
            }),
            finalize(() => this.loadingService.hide('overlay'))
          );
        })
      )
      .subscribe((res) => {
        this.res = res;
        this.currentPage = res?.page || 1;
      });
  }

  getTitle() {
    return this.type$.value === 'movie'
      ? this.filmTabs[this.tab$.value]
      : this.tvTabs[this.tab$.value];
  }

  loadPage(page: number): void {
    if (this.isDiscover) {
      const filters = this.params;
      this.discover(filters, page);
    } else {
      this.page$.next(page);
    }
  }

  discover(params: any, page: number = 1): void {
    this.params = params;
    this.isDiscover = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadingService.show('overlay');

    this.movieService
      .discover(this.type$.value, params, page)
      .pipe(finalize(() => this.loadingService.hide('overlay')))
      .subscribe((res) => {
        this.res = res;
        this.currentPage = res?.page || 1;
      });
  }

  updateForNewRoute(): void {
    this.isDiscover = false;
    this.movieFilter.reset();
  }

  getType(): string {
    return this.type$.value;
  }

  isMovieNone(): boolean {
    return !this.res.results.length;
  }
}
