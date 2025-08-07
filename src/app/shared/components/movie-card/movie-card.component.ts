import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  Renderer2,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  BASE_IMG_URL_220_330,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { HomeService } from '../../../features/home/services/home.service';
import { Router } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { AccountService } from 'src/app/core/services/account.service';
import {
  FavoriteRequets,
  ShowsState,
  WatchlistRequets,
} from 'src/app/core/model/account';
import { finalize, Observable } from 'rxjs';
import { safeRequest } from 'src/app/core/utils/functions';
import { FeedbackService } from 'src/app/core/services/feedback.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  public readonly defaultImg = DEFAULT_IMG;
  crrMore = '/assets/icons/more.png';

  @Input() item!: any;
  @Input() imgBaseUrl = BASE_IMG_URL_220_330;
  @Input() type: string = 'movie';
  @Input() hasScore: boolean = false;
  @Input() hasPlay: boolean = false;
  @Input() action!: string;
  @Input() wImg: string = '220px';
  @Input() hImg: string = '330px';
  @Input() colorTitle: string = '#333';
  @Input() colorDate: string = '#777';
  @Input() hasMore: boolean = false;

  @ViewChild('movieCard') movieCard!: ElementRef;

  @ViewChild(RatingComponent) rating!: RatingComponent;

  selectedTrailerKey: string | null = null;
  safeTrailerUrl: SafeResourceUrl | null = null;

  actionStates: Record<string, boolean> = {
    list: false,
    heart: false,
    bookmark: false,
    star: false,
  };

  openMore = false;
  score = 0;

  showsState: ShowsState | null = null;

  constructor(
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private renderer: Renderer2,
    public loadingService: LoadingService,
    private accountService: AccountService,
    private feedbackService: FeedbackService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.score = Math.round(this.getScore() * 10);
  }

  ngOnInit(): void {}

  onPosterClick(): void {
    if (!this.item?.id) return;

    switch (this.action) {
      case 'trailer':
        this.playTrailer(this.item.id);
        break;
      case 'movie-details':
        this.goToMovieDetails(this.item.id);
        break;
      default:
        break;
    }
  }

  goToMovieDetails(id: number): void {
    console.log();
    this.router.navigate([`/movie/details/${this.type}/${id}`]);
  }

  playTrailer(movieId: number): void {
    this.loadingService.show('overlay');
    this.homeService
      .getMovieTrailerVideo(movieId)
      .pipe(finalize(() => this.loadingService.hide('overlay')))
      .subscribe({
        next: (res) => {
          const trailer = res.results.find(
            (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
          );
          if (trailer) {
            this.selectedTrailerKey = trailer.key;
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
            );
            this.cdr.markForCheck();
          }
        },
      });
  }

  closeTrailer(): void {
    this.selectedTrailerKey = null;
    this.safeTrailerUrl = null;
  }

  getSafeTrailerUrl(): SafeResourceUrl | null {
    return this.safeTrailerUrl;
  }

  getImageSrc(): string {
    if (!this.item) return this.defaultImg;

    let path = this.item?.poster_path || this.item?.profile_path;
    if (this.hasPlay) path = this.item?.backdrop_path;
    return path ? this.imgBaseUrl + path : this.defaultImg;
  }

  getAltText(): string {
    if (!this.item) return 'Unknown Title';
    return this.item?.title || this.item?.name || 'Unknown Title';
  }

  getTitle(): string {
    return (this.item.name || this.item.title) ?? '--';
  }

  getScore(): number {
    return (this.item.vote_average || this.item.popularity) ?? '--';
  }

  getReleaseDate(): string {
    return this.item.release_date || '';
  }

  onMoreEnter(): void {
    this.crrMore = '/assets/icons/more-hight_light.png';
  }

  onMoreLeave(): void {
    this.crrMore = '/assets/icons/more.png';
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

  onMoreClick(): void {
    this.openMore = !this.openMore;
    if (!this.showsState) {
      this.loadingService.show('inner');
      let request$ = safeRequest(
        this.accountService.getShowsState(this.item.id, this.type),
        'Shows state',
        this.feedbackService
      );

      request$
        .pipe(finalize(() => this.loadingService.hide('inner')))
        .subscribe((res) => {
          this.showsState = res;
          if (res !== null) {
            this.actionStates['heart'] = res.favorite;
            this.actionStates['bookmark'] = res.watchlist;
            this.actionStates['star'] = res.rated;
          }
        });
    }
  }

  @HostListener('mouseleave')
  hideMore(): void {
    this.openMore = false;
  }

  isActive(action: string): boolean {
    return !!this.actionStates[action];
  }

  getIconClass(action: string): string {
    const base = `action-menu__icon action-menu__icon--${action}`;
    return this.isActive(action) ? `${base} action-menu__icon--selected` : base;
  }

  isMoreVisible(): boolean {
    return this.hasMore && this.openMore;
  }

  showRating() {
    this.rating.toggle();
  }
}
