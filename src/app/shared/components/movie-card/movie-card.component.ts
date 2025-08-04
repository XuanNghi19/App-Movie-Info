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
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  BASE_IMG_URL_220_330,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { HomeService } from '../../../features/home/services/home.service';
import { Router } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent implements OnInit, OnChanges {
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

  @Output() addToList = new EventEmitter<number>();
  @Output() favorite = new EventEmitter<number>();
  @Output() watchlist = new EventEmitter<number>();
  @Output() rate = new EventEmitter<number>();

  @ViewChild('movieCard') movieCard!: ElementRef;

  @ViewChild(RatingComponent) rating!: RatingComponent;

  selectedTrailerKey: string | null = null;
  safeTrailerUrl: SafeResourceUrl | null = null;

  actionStates: { [key: string]: boolean } = {
    list: false,
    heart: false,
    bookmark: false,
    star: false,
  };

  openMore = false;
  score = 0;

  constructor(
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
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
    this.homeService.getMovieTrailerVideo(movieId).subscribe({
      next: (res) => {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) {
          this.selectedTrailerKey = trailer.key;
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
          );
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
    if (!this.item) return '';
    return this.item.title === undefined ? this.item.name : this.item.title;
  }

  getScore(): number {
    if (!this.item) return 0;
    return this.item.vote_average === undefined
      ? this.item.popularity
      : this.item.vote_average;
  }

  getReleaseDate(): string {
    return this.item?.release_date || '';
  }

  onMoreEnter(): void {
    this.crrMore = '/assets/icons/more-hight_light.png';
  }

  onMoreLeave(): void {
    this.crrMore = '/assets/icons/more.png';
  }

  onItemMoreClick(action: 'list' | 'heart' | 'bookmark' | 'star'): void {
    this.actionStates[action] = !this.actionStates[action];
    switch (action) {
      case 'list':
        this.addToList.emit(this.item.id);
        break;
      case 'heart':
        this.favorite.emit(this.item.id);
        break;
      case 'bookmark':
        this.watchlist.emit(this.item.id);
        break;
      case 'star':
        this.rate.emit(this.item.id);
        break;
    }
  }

  onMoreClick(): void {
    this.openMore = !this.openMore;
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
