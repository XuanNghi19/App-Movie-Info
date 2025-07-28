import { Component, Input, OnInit } from '@angular/core';
import { Keyword, MovieDetails, TvDetails } from '../../types/movie-details';

@Component({
  selector: 'app-movie-aside',
  templateUrl: './movie-aside.component.html',
  styleUrls: ['./movie-aside.component.scss'],
})
export class MovieAsideComponent implements OnInit {
  constructor() {}

  @Input() keywords: Keyword[] = [];
  @Input() details!: MovieDetails | TvDetails;

  ngOnInit(): void {}

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
    return this.details.original_language;
  }
}
