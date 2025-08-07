import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import {
  BASE_IMG_URL_220_330,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { safeRequest } from 'src/app/core/utils/functions';
import { RatingComponent } from 'src/app/shared/components/rating/rating.component';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaCardComponent implements AfterViewInit {
  private imgurl = BASE_IMG_URL_220_330;
  private dftImg = DEFAULT_IMG;

  trashHover = false;
  score = 0;

  @Input() media: any;
  @Input() type: string = 'movies';
  @Input() list: string = 'watchlist';

  @Output() navigate = new EventEmitter<{ id: number; type: string }>();
  @Output() remove = new EventEmitter<number>();

  @ViewChild(RatingComponent) rating!: RatingComponent;
  
  constructor(
    public loadingService: LoadingService,
    private accountService: AccountService,
    private feedbackService: FeedbackService
  ) {}

  ngAfterViewInit(): void {
    this.score = Math.round(this.getScore() * 10);
  }

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
    this.navigate.emit({
      id: this.media.id,
      type: this.type === 'movies' ? 'movie' : this.type,
    });
  }

  onRemove() {
    this.list === 'watchlist'
      ? this.setWatchlist(false)
      : this.setFavorite(false);
  }

  setFavorite(state: boolean): void {
    this.loadingService.show(this.media.id);

    let request$ = safeRequest(
      this.accountService.setFavorite({
        favorite: state,
        media_id: this.media.id,
        media_type: this.type === 'movies' ? 'movie' : 'tv',
      }),
      'Set Favorite',
      this.feedbackService
    );

    request$
      .pipe(finalize(() => this.loadingService.hide(this.media.id)))
      .subscribe((res) => {
        if (res?.success) {
          this.feedbackService.success('Thay đổi trạng thái thành công!', 3000);
          this.remove.emit(this.media.id);
        } else {
          this.feedbackService.warning(
            'Thay đổi trạng thái không thành công!',
            3000
          );
        }
      });
  }

  setWatchlist(state: boolean): void {
    this.loadingService.show(this.media.id);

    let request$ = safeRequest(
      this.accountService.setWatchlist({
        watchlist: state,
        media_id: this.media.id,
        media_type: this.type === 'movies' ? 'movie' : 'tv',
      }),
      'Set Favorite',
      this.feedbackService
    );

    request$
      .pipe(finalize(() => this.loadingService.hide(this.media.id)))
      .subscribe((res) => {
        if (res?.success) {
          this.feedbackService.success('Thay đổi trạng thái thành công!', 3000);
          this.remove.emit(this.media.id);
        } else {
          this.feedbackService.warning(
            'Thay đổi trạng thái không thành công!',
            3000
          );
        }
      });
  }
  showRating() {
    this.rating.toggle();
  }
  getScore(): number {
    return (this.media.vote_average || this.media.popularity) ?? '--';
  }
}
