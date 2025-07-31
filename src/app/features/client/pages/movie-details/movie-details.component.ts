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
  RecommendationResponse,
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
  public recommendations!: RecommendationResponse;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.paramMap.get('type') ?? 'movie';
    console.log(this.type);
    this.load({ id: id, type: this.type });
  }

  load(info: { id: number; type: string }) {
    this.loadingService.show();

    let request$ = forkJoin({
      details: this.movieDetailsService.getTvDetails(info.id, this.type),
      credits: this.movieDetailsService.getCredits(info.id, this.type),
      keywords: this.movieDetailsService.getKeywords(info.id, this.type),
      reviews: this.movieDetailsService.getReviews(info.id, this.type),
      videos: this.movieDetailsService.getVideos(info.id, this.type),
      images: this.movieDetailsService.getImages(info.id, this.type),
      recommendations: this.movieDetailsService.getRecommendations(
        info.id,
        this.type
      ),
    });

    request$.pipe(finalize(() => this.loadingService.hide())).subscribe({
      next: (res) => {
        this.details = res.details;
        this.keywords = res.keywords.keywords;
        this.credits = res.credits;
        this.reviews = res.reviews;
        this.videos = res.videos;
        this.images = res.images;
        this.recommendations = res.recommendations;
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

    window.scrollTo({top: 0, behavior: 'smooth'});
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
