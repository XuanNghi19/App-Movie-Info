import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Credits, MovieDetails, TvDetails } from '../../models/movie-details';
import {
  BACK_DROP,
  BASE_IMG_URL_300_450,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';

@Component({
  selector: 'app-movie-header-info',
  templateUrl: './movie-header-info.component.html',
  styleUrls: ['./movie-header-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieHeaderInfoComponent implements OnInit, AfterViewInit, OnChanges {
  public readonly urlPoster = BASE_IMG_URL_300_450;
  public readonly urlBackDrop = BACK_DROP;
  public readonly defaultImg = DEFAULT_IMG;

  @Input() details!: MovieDetails | TvDetails;
  @Input() type: string = 'movie';

  @Input() movieCredits!: Credits;
  @Output() playTrailer = new EventEmitter<void>();
  
  @ViewChild('info', { static: true }) infoRef!: ElementRef<HTMLElement>;
  @ViewChild(RatingComponent) rating!: RatingComponent;

  top6Crew!: any[];

  activeButtons: Record<string, boolean> = {
    list: false,
    heart: false,
    bookmark: false,
  };

  userRating = 0;

  toggle(type: 'list' | 'heart' | 'bookmark') {
    this.activeButtons[type] = !this.activeButtons[type];
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.userRating = Math.round(this.details.vote_average * 10);
  }

  ngOnInit(): void {
    const importantJobs = [
      'Director',
      'Executive Producer',
      'Director of Photography',
      'Writer',
      'Screenplay',
      'Story',
      'Editor',
    ];
    this.top6Crew = this.movieCredits.crew
      .filter((c) => importantJobs.includes(c.job))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 6)
      .map((c) => ({
        name: c.name,
        job: c.job,
      }));
  }

  ngAfterViewInit(): void {
    // this.setBackgroundImageAndTheme(
    //   `${this.urlBackDrop}${this.details.backdrop_path}`
    // );
  }
  private setBackgroundImageAndTheme(url: string): void {
    const el = this.infoRef.nativeElement;

    el.style.backgroundImage = `url(${url})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = '70% 10%';
  }
  get title(): string {
    return 'title' in this.details ? this.details.title : this.details.name;
  }

  get releaseDate(): string {
    const date =
      'release_date' in this.details
        ? this.details.release_date
        : this.details.first_air_date;
    return date;
  }

  get genres(): any[] {
    return this.details.genres;
  }

  get score(): number {
    return this.details.vote_average;
  }

  get runtime(): string {
    const minutes =
      'runtime' in this.details
        ? this.details?.runtime
        : this.details.episode_run_time[1];
    if (!minutes || isNaN(minutes)) return '--';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  get peoples(): { name: string; job: string }[] {
    switch (this.type) {
      case 'movie':
        return this.top6Crew;
      case 'tv':
        if ('created_by' in this.details) {
          const creators = this.details.created_by;
          return creators.map((creator: any) => ({
            name: creator.name,
            job: 'Creator',
          }));
        }
        break;
      default:
        break;
    }
    return [];
  }

  get poster(): string {
    if (this.details === null) return this.defaultImg;
    return this.urlPoster + this.details.poster_path;
  }

  getIcon(type: 'list' | 'heart' | 'bookmark'): string {
    const basePath = '/assets/icons';
    const isActive = this.activeButtons[type];

    switch (type) {
      case 'list':
        return `${basePath}/list-${isActive ? 'active' : 'white'}.png`;
      case 'heart':
        return `${basePath}/heart-${isActive ? 'active' : 'white'}.png`;
      case 'bookmark':
        return `${basePath}/bookmark-${isActive ? 'active' : 'white'}.png`;
      default:
        return '';
    }
  }

  onPlayTraier() {
    this.playTrailer.emit();
  }

  showRating() {
    this.rating.toggle();
  }
}
