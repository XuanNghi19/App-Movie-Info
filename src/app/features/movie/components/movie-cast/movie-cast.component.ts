import {
  Component,
  Input,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CastMember, MovieDetails, TvDetails } from '../../models/movie-details';
import { BASE_IMG_URL_138_175 } from 'src/app/core/utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCastComponent implements OnInit, OnChanges {
  public readonly imgBaseUrl_138_175 = BASE_IMG_URL_138_175;
  @Input() casts!: CastMember[];
  @Input() type!: string;
  @Input() details!: MovieDetails | TvDetails;
  visibleCasts: CastMember[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.casts) {
      this.visibleCasts = this.casts.slice(0, 11);
    }
  }

  fullCredits() {
    this.router.navigate(
      ['movie/credits', this.type, this.details.id],
      {
        queryParams: {
          title: this.title,
          img: this.details.poster_path,
          releaseDate: this.releaseDate,
        },
      }
    );
  }

  getTitle(): string {
    switch (this.type) {
      case 'tv':
        return 'Series Cast';
      case 'movie':
        return 'Top Billed Cast';
    }
    return '--';
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
}
