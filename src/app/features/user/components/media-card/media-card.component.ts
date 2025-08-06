import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  BASE_IMG_URL_220_330,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
})
export class MediaCardComponent {
  private imgurl = BASE_IMG_URL_220_330;
  private dftImg = DEFAULT_IMG;

  trashHover = false;

  @Input() media: any;
  @Input() type: string = 'movies';
  @Input() list: string = 'watchlist';

  @Output() navigate = new EventEmitter<{ id: number; type: string }>();

  constructor() {}

  get title(): string {
    return this.type === 'tv' ? this.media?.name : this.media?.title;
  }

  get originalTitle(): string {
    return this.type === 'tv'
      ? this.media?.original_name
      : this.media?.original_title;
  }

  get releaseDate(): string {
    return this.type === 'tv'
      ? this.media?.first_air_date
      : this.media?.release_date;
  }

  get posterUrl(): string {
    return this.media?.poster_path
      ? `${this.imgurl}${this.media.poster_path}`
      : this.dftImg;
  }

  get vote(): number {
    return Math.round(this.media?.vote_average * 10);
  }

  get year(): string {
    return this.releaseDate?.split('-')[0] ?? '';
  }

  onNavigate() {
    this.navigate.emit({id: this.media.id, type: this.type === 'movies' ? 'movie' : this.type});
  }
}
