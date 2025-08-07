import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
} from '../../models/movie-details';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MovieMediaComponent } from '../../components/movie-media/movie-media.component';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { safeRequest } from 'src/app/core/utils/functions';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  @ViewChild(MovieMediaComponent) media!: MovieMediaComponent;

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

  public isTrailer: boolean = false;

  @ViewChild(RatingComponent) rating!: RatingComponent;
  userRating = 0;

  isFavorite = false;
  isWatchList = false;

  constructor(
    private movieDetailsService: MovieDetailsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private feedbackService: FeedbackService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    let id = 0;
    this.route.paramMap.subscribe((params) => {
      id = Number(params.get('id'));
      this.type = params.get('type') ?? 'movie';
    });
    this.load({ id: id, type: this.type });
  }

  load(info: { id: number; type: string }) {
    this.loadingService.show('overlay');

    const requests = {
      details: safeRequest(
        this.movieDetailsService.getTvDetails(info.id, this.type),
        'Details',
        this.feedbackService
      ),
      credits: safeRequest(
        this.movieDetailsService.getCredits(info.id, this.type),
        'Credits',
        this.feedbackService
      ),
      keywords: safeRequest(
        this.movieDetailsService.getKeywords(info.id, this.type),
        'Keywords',
        this.feedbackService
      ),
      reviews: safeRequest(
        this.movieDetailsService.getReviews(info.id, this.type),
        'Reviews',
        this.feedbackService
      ),
      videos: safeRequest(
        this.movieDetailsService.getVideos(info.id, this.type),
        'Videos',
        this.feedbackService
      ),
      images: safeRequest(
        this.movieDetailsService.getImages(info.id, this.type),
        'Images',
        this.feedbackService
      ),
      recommendations: safeRequest(
        this.movieDetailsService.getRecommendations(info.id, this.type),
        'Recommendations',
        this.feedbackService
      ),
      showsState: safeRequest(
        this.accountService.getShowsState(info.id, this.type),
        'Shows State',
        this.feedbackService
      ),
    };
    const request$ = combineLatest(requests);
    request$
      .pipe(finalize(() => this.loadingService.hide('overlay')))
      .subscribe((res) => {
        this.details = res.details as MovieDetails;
        this.userRating =
          res.details && 'vote_average' in res.details
            ? Math.round(
                (res.details as MovieDetails | TvDetails).vote_average * 10
              )
            : 0;
        this.credits = res.credits as Credits;
        this.reviews = res.reviews as ReviewsResponse;
        this.videos = res.videos as VideoResponse;
        this.images = res.images as MediaImagesResponse;
        this.recommendations = res.recommendations as RecommendationResponse;

        let showsState = res.showsState;
        this.isFavorite = showsState?.favorite || false;
        this.isWatchList = showsState?.watchlist || false;

        if (res.keywords) {
          this.keywords =
            this.type === 'movie'
              ? res.keywords && 'keywords' in res.keywords
                ? res.keywords.keywords
                : []
              : res.keywords && 'results' in res.keywords
              ? res.keywords.results
              : [];
        } else {
          this.keywords = [];
        }
      });

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  handlePlayTrailer() {
    if (!this.videos.results.length) {
      this.feedbackService.warning(
        'Hiện tại không có Trailer cho show này!',
        3000
      );
      return;
    }
    this.media.playTrailer(this.videos.results[0].key);
  }

  get title(): string {
    return 'title' in this.details ? this.details.title : this.details.name;
  }

  showRating() {
    this.rating.toggle();
  }
}
