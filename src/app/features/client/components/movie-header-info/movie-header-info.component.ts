import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Credits,
  MovieDetails,
  TvDetails,
} from '../../types/movie-details';
import { BACK_DROP, BASE_IMG_URL_300_450, DEFAULT_IMG } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-movie-header-info',
  templateUrl: './movie-header-info.component.html',
  styleUrls: ['./movie-header-info.component.scss'],
})
export class MovieHeaderInfoComponent implements OnInit, AfterViewInit {
  public readonly urlPoster = BASE_IMG_URL_300_450;
  public readonly urlBackDrop = BACK_DROP;
  public readonly defaultImg = DEFAULT_IMG;

  @Input() details!: MovieDetails | TvDetails;
  @Input() type: string = 'movie';

  @Input() movieCredits!: Credits;
  @ViewChild('info', { static: true }) infoRef!: ElementRef<HTMLElement>;
  top6Crew!: any[];

  constructor() {}

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
    const minutes ='runtime' in this.details ? this.details?.runtime : this.details.episode_run_time[1];
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
    if(this.details === null) return this.defaultImg;
    return this.urlPoster + this.details.poster_path;
  }
}
