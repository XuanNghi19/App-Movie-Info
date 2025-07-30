import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import {
  Keyword,
  Credits,
  MovieDetails,
  TvDetails,
  Season,
  NextEpisode,
  ReviewsResponse,
  VideoResponse,
  MediaImagesResponse,
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
  credits: Credits = {
    id: 0,
    crew: [],
    cast: [],
  };
  public keywords: Keyword[] = [];
  public reviews!: ReviewsResponse;
  public videos!: VideoResponse;
  public images!: MediaImagesResponse;

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
          credits: this.movieDetailsService.getCredits(id, this.type),
          keywords: this.movieDetailsService.getKeywords(id, 'tv'),
          reviews: this.movieDetailsService.getReviews(id, 'tv'),
          videos: this.movieDetailsService.getVideos(id, 'tv'),
          images: this.movieDetailsService.getImages(id, 'tv'),
        });
        break;
      case 'movie':
        request$ = forkJoin({
          details: this.movieDetailsService.getMovieDetails(id),
          credits: this.movieDetailsService.getCredits(id, this.type),
          keywords: this.movieDetailsService.getKeywords(id, 'movie'),
          reviews: this.movieDetailsService.getReviews(id, 'movie'),
          videos: this.movieDetailsService.getVideos(id, 'movie'),
          images: this.movieDetailsService.getImages(id, 'movie'),
        });
        break;
      default:
        return;
    }
    request$.pipe(finalize(() => this.loadingService.hide())).subscribe({
      next: (res) => {
        this.details = res.details;
        this.keywords = res.keywords.keywords;
        this.credits = res.credits;
        this.reviews = res.reviews;
        this.videos = res.videos;
        this.images = res.images;
        if (this.type === 'movie') {
          this.keywords = res.keywords.keywords;
        } else if (this.type === 'tv') {
          this.keywords = res.keywords.results;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get lastSeason(): Season {
    const season = 'seasons' in this.details ? this.details.seasons : [];
    return season[season.length - 1];
  }

  get name(): string {
    return 'name' in this.details ? this.details.name : this.details.title;
  }

  get nextEpisode(): NextEpisode | null {
    return 'next_episode_to_air' in this.details
      ? this.details.next_episode_to_air
      : null;
  }
}
