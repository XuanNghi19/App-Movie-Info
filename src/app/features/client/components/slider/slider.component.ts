import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BASE_IMG_URL_220_330 } from 'src/app/core/utils/constants';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit {
  public readonly defaultImg = '../../../../../assets/icons/unknow_img.svg';

  @Input() imgBaseUrl = BASE_IMG_URL_220_330;

  @Input() hasScore: boolean = false;
  @Input() hasPlay: boolean = false;
  @Input() action: string = '';
  @Input() bgImg: string = '';
  @Input() color: string = 'black';
  @Input() wImg: string = '220px';
  @Input() hImg: string = '330px';
  @Input() colorTitle: string = '#333';
  @Input() colorDate: string = '#777';
  @Input() title: string = 'Slider Title';
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  @Input() items: any[] = [];
  @Input() onTabChange: (tab: string) => void = () => {};

  @ViewChild('slider') sliderRef!: ElementRef;

  selectedTrailerKey: string | null = null;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private renderer: Renderer2,
    private homeService: HomeService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.sliderRef.nativeElement,
      'background-image',
      `url(${this.bgImg})`
    );
    this.renderer.setStyle(
      this.sliderRef.nativeElement,
      'background-size',
      'cover'
    );
    this.renderer.setStyle(
      this.sliderRef.nativeElement,
      'background-position',
      'center'
    );
  }

  ngOnInit(): void {}

  onPosterClick(id: number): void {
    switch (this.action) {
      case 'trailer':
        this.playTrailer(id);
        break;
      case 'movie-details':
        this.goToMovieDetails(id);
        break;
      case 'favorite':
        this.goToPepleDetails(id);
        break;
      default:
        break;
    }
  }

  goToMovieDetails(id: number) {
    this.router.navigate([`/client/movie-details/${id}`]);
  }

  goToPepleDetails(id: number) {}

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

  getImageSrc(item: any): string {
    const path = item?.poster_path || item?.profile_path;
    return path ? this.imgBaseUrl + path : this.defaultImg;
  }

  getAltText(item: any): string {
    return item?.title || item?.name || 'Unknown Title';
  }
}
