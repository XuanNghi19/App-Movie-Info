import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Keyword, MovieDetails, TvDetails } from '../../models/movie-details';
import { getLanguageName } from 'src/assets/languages/main';

@Component({
  selector: 'app-movie-aside',
  templateUrl: './movie-aside.component.html',
  styleUrls: ['./movie-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieAsideComponent implements OnInit {
  constructor() {}

  @Input() keywords: Keyword[] = [];
  @Input() details!: MovieDetails | TvDetails;

  ngOnInit(): void {
  }

  get originalTitle(): string {
    const originalTitle =
      'original_title' in this.details
        ? this.details.original_title
        : this.details.original_name;
    return originalTitle ?? '--';
  }

  get status(): string {
    return this.details.status ?? '--';
  }

  get budget(): number | null {
    const budget = 'budget' in this.details ? this.details.budget : null;
    return budget;
  }

  get revenue(): number | null {
    const revenue = 'revenue' in this.details ? this.details.revenue : null;
    return revenue;
  }

  get network(): string | null {
    const networks: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[] | null = 'networks' in this.details ? this.details.networks : null;
    return networks && networks.length > 0 ? networks[0].name : null;
  }

  get tvType(): string | null {
    const type = 'type' in this.details ? this.details.type : null;
    return type;
  }

  get originalLanguage(): string {
    return getLanguageName(this.details.original_language);
  }
}
