import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieService } from '../../services/movie.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GenreResponse } from '../../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  title = '';
  private type$ = new BehaviorSubject<string>('movie');
  private tab$ = new BehaviorSubject<string>('popular');
  private page$ = new BehaviorSubject<number>(1);

  filmTabs: Record<string, string> = {
    popular: 'Popular Movies',
    now_playing: 'Now Playing Movies',
    upcoming: 'Upcoming Movies',
    top_rated: 'Top Rated Movies',
  };

  tvTabs: Record<string, string> = {
    popular: 'Popular TV Shows',
    airing_today: 'TV Shows Airing Today',
    on_the_air: 'Currently Airing TV Shows',
    top_rated: 'Top Rated TV Shows',
  };

  currentPage = 1;
  res: any;
  genres!: GenreResponse;
  genres$ = new BehaviorSubject<string>('movie');;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();

    this.activatedRoute.paramMap.subscribe((params) => {
      const tab = params.get('tab') ?? 'popular';
      const type = params.get('type') ?? 'movie';

      this.tab$.next(tab);
      this.type$.next(type);
      this.page$.next(1);

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
        tap(() => this.loadingService.show()),
        switchMap(([type, tab, page]) => {
          let main$: Observable<any> =
            type === 'movie'
              ? this.movieService.getMovie(page, tab)
              : this.movieService.getTv(page, tab);

          return main$.pipe(
            catchError((err) => {
              console.error('Main API failed', err);
              return of(null);
            }),
            finalize(() => this.loadingService.hide())
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.page$.next(page);
  }

  getType(): string {
    return this.type$.value;
  }
}
