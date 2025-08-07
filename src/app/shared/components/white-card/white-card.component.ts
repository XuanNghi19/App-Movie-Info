import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { Router } from '@angular/router';
import { BASE_IMG_URL_220_330 } from 'src/app/core/utils/constants';
import { RatingComponent } from '../rating/rating.component';
import { ShowsState } from 'src/app/core/model/account';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AccountService } from 'src/app/core/services/account.service';
import { finalize } from 'rxjs';
import { safeRequest } from 'src/app/core/utils/functions';
import { FeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-white-card',
  templateUrl: './white-card.component.html',
  styleUrls: ['./white-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteCardComponent implements OnInit, AfterViewInit {
  public readonly defaultImg = '/assets/icons/unknow_img.svg';
  crrMore = '/assets/icons/more.png';

  @Input() item!: any;
  @Input() imgBaseUrl = BASE_IMG_URL_220_330;
  @Input() hasPopularity: boolean = false;
  @Input() hasCharater: boolean = false;
  @Input() hasKnow: boolean = false;
  @Input() hasScore: boolean = false;
  @Input() hasMore: boolean = false;
  @Input() hasDate: boolean = false;
  @Input() knowFor: string = '';
  @Input() action!: string;
  @Input() wImg: string = '220px';
  @Input() hImg: string = '330px';
  @Input() color: string = '#333';
  @Input() titleSize: string = '18px';
  @Input() fontSize: string = '16px';
  @Input() imgFlex: number = 1;
  @Input() type: string = 'movie';

  @ViewChild(RatingComponent) rating!: RatingComponent;

  actionStates: { [key: string]: boolean } = {
    list: false,
    heart: false,
    bookmark: false,
    star: false,
  };

  openMore = false;
  score = 0;

  showsState: ShowsState | null = null;

  constructor(
    private router: Router,
    public loadingService: LoadingService,
    private accountService: AccountService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.score = Math.round(this.getScore() * 10);
  }

  onPosterClick(): void {
    if (!this.item?.id) return;

    switch (this.action) {
      case 'people-detail':
        this.goToPepleDetails(this.item.id);
        break;
      case 'movie-detail':
        this.goToMovieDetails(this.item.id, this.type);
        break;
    }
  }

  goToPepleDetails(id: number): void {
    this.router.navigate([`/people/details/${id}`]);
  }

  goToMovieDetails(id: number, type: string): void {
    this.router.navigate([`/movie/details/${type}/${id}`]);
  }

  getImageSrc(): string {
    if (!this.item) return this.defaultImg;

    let path = this.item?.poster_path || this.item?.profile_path;
    return path ? this.imgBaseUrl + path : this.defaultImg;
  }

  getAltText(): string {
    if (!this.item) return 'Unknown Name';
    return this.item?.name || 'Unknown Title';
  }

  getName(): string {
    return this.item.name ?? this.item.title ?? '--';
  }

  get popularity(): number {
    return this.item.popularity || '--';
  }

  get character(): string {
    return this.item.character || '--';
  }

  getScore(): number {
    return (
      (this.item.vote_average !== undefined
        ? this.item.vote_average
        : this.item.popularity) ?? '--'
    );
  }

  isActive(action: string): boolean {
    return !!this.actionStates[action];
  }

  getIconClass(action: string): string {
    const base = `action-menu__icon action-menu__icon--${action}`;
    return this.isActive(action) ? `${base} action-menu__icon--selected` : base;
  }

  @HostListener('mouseleave')
  hideMore(): void {
    this.openMore = false;
  }

  isMoreVisible(): boolean {
    return this.hasMore && this.openMore;
  }

  onItemMoreClick(action: 'list' | 'heart' | 'bookmark' | 'star'): void {
    if (action !== 'bookmark' && action !== 'heart') {
      this.actionStates[action] = !this.actionStates[action];
      return;
    }

    const isActive = this.actionStates[action];
    const payload = {
      media_id: this.item.id,
      media_type: this.type,
      watchlist: action === 'bookmark' ? !isActive : false,
      favorite: action === 'heart' ? !isActive : false,
    };

    const requestFn =
      action === 'bookmark'
        ? this.accountService.setWatchlist.bind(this.accountService)
        : this.accountService.setFavorite.bind(this.accountService);

    const label = action === 'bookmark' ? 'Set Watchlist' : 'Set Favorite';

    this.loadingService.show('inner');

    safeRequest(requestFn(payload), label, this.feedbackService)
      .pipe(finalize(() => this.loadingService.hide('inner')))
      .subscribe((res) => {
        if (res?.success) {
          this.feedbackService.success('Thay đổi trạng thái thành công!', 3000);
          this.actionStates[action] = !isActive;
        } else {
          this.feedbackService.warning('Thay đổi trạng thái thất bại!', 3000);
        }
      });
  }

  onMoreEnter(): void {
    this.crrMore = '/assets/icons/more-hight_light.png';
  }

  onMoreLeave(): void {
    this.crrMore = '/assets/icons/more.png';
  }

  onMoreClick(): void {
    this.openMore = !this.openMore;

    if (!this.showsState) {
      this.loadingService.show('inner');
      this.accountService
        .getShowsState(this.item.id, this.type)
        .pipe(finalize(() => this.loadingService.hide('inner')))
        .subscribe((res) => {
          this.showsState = res;

          this.actionStates['heart'] = res.favorite;
          this.actionStates['bookmark'] = res.watchlist;
          this.actionStates['star'] = res.rated;
        });
    }
  }

  showRating() {
    this.rating.toggle();
  }

  getTitle(): string {
    return this.item.title || this.item.name;
  }

  getReleaseDate(): string {
    return this.item.release_date ?? this.item.first_air_date ?? '--';
  }
}
