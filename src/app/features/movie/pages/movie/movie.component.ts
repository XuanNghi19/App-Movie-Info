import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieService } from '../../services/movie.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  title = '';
  tab = 'popular';
  type = 'film';

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
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.tab = params.get('tab') ?? 'popular';
      this.type = params.get('type') ?? 'popular';

      this.loadPage(1);
    });
  }

  getTitle() {
    return this.type === 'film'
      ? this.filmTabs[this.tab]
      : this.tvTabs[this.tab];
  }

  loadPage(page: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loadingService.show();
    let getRes$: Observable<any>;

    if (this.type === 'film') {
      getRes$ = this.movieService.getMovie(page, this.tab);
    } else {
      getRes$ = this.movieService.getTv(page, this.tab);
    }

    getRes$
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe((res) => {
        this.res = res;
        this.currentPage = res.page;

        console.log(this.res);
      });
  }
}
