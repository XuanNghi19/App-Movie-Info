import { Component, OnInit } from '@angular/core';
import { WatchListService } from '../../services/watch-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, finalize, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { safeRequest } from 'src/app/core/utils/functions';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  listsTitle: Record<string, string> = {
    watchlist: 'My Watchlist',
    favorite: 'Favorites',
  };

  list = 'watchlist';
  type = 'movies';

  movieCount = 0;
  tvCount = 0;

  list$ = new BehaviorSubject<string>('watchlist');
  type$ = new BehaviorSubject<string>('movies');
  params$ = new BehaviorSubject<any>({
    page: 1,
    language: 'en-US',
    sort_by: 'created_at.asc',
  });

  res: any;
  crrPage = 1;

  constructor(
    private watchListService: WatchListService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.show('overlay');

    this.route.paramMap.subscribe((params) => {
      this.list = params.get('list') ?? 'watchlist';
      this.type = params.get('type') ?? 'movies';

      if (this.list$.value !== this.list) this.list$.next(this.list);
      if (this.type$.value !== this.type) this.type$.next(this.type);
    });

    combineLatest([this.list$, this.type$, this.params$])
      .pipe(
        tap(() => this.loadingService.show('overlay')),
        switchMap(([list, type, params]) => {
          return safeRequest(
            this.watchListService.getWatchList(type, list, params),
            `${list} ${type}`
          ).pipe(finalize(() => this.loadingService.hide('overlay')));
        })
      )
      .subscribe((res) => {
        this.res = res;
        this.crrPage = res?.page || 1;

        this.type === 'movies'
          ? (this.movieCount = res?.total_results || 0)
          : (this.tvCount = res?.total_results || 0);
      });
  }

  loadPage(page: number): void {
    this.params$.next({
      ...this.params$.value,
      page,
    });
  }
  onSortChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortBy = selectElement.value;

    this.params$.next({
      ...this.params$.value,
      sort_by: sortBy,
    });
  }

  getTotalResults(): number {
    return this.res?.total_results.length;
  }

  goToDetalis(data: {id: number, type: string}): void {
    this.router.navigate(['/movie/details/', data.type, data.id]);
  }
}
