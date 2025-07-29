import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BASE_IMG_URL_220_330, DEFAULT_IMG } from 'src/app/core/utils/constants';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  public readonly defaultImg = DEFAULT_IMG;

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

  selectedTrailerKey: string | null = null;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

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
    this.router.navigate([`/client/movie-details/${this.type}/${id}`]);
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
}
