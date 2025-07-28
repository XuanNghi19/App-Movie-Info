import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import {
  Keyword,
  MovieCredits,
  MovieDetails,
  TvDetails,
} from '../../types/movie-details';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  details!: MovieDetails | TvDetails;
  type: string = 'movie';
  movieCredits: MovieCredits = {
    id: 0,
    crew: [],
    cast: []
  };
  public keywords: Keyword[] = [];

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.paramMap.get('type') ?? 'movie';

    let request$: Observable<any>;

    switch (this.type) {
      case 'tv':
        request$ = forkJoin({
          details: this.movieDetailsService.getTvDetails(id),
          keywords: this.movieDetailsService.getKeywords(id, 'tv')
        });
        break;
      case 'movie':
        request$ = forkJoin({
          details: this.movieDetailsService.getMovieDetails(id),
          credits: this.movieDetailsService.getMoiveCredits(id),
          keywords: this.movieDetailsService.getKeywords(id, 'movie')
        });
        break;
      default:
        return;
    }
    request$.pipe(finalize(() => this.loadingService.hide())).subscribe({
      next: (res) => {
        this.details = res.details;
        this.keywords = res.keywords.keywords;
        if (this.type === 'movie') {
          this.movieCredits = res.credits;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
