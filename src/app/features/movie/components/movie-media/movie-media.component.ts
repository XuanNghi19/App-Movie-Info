import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  MediaImagesResponse,
  VideoResponse,
  VideoResult,
} from '../../models/movie-details';
import {
  BACK_DROP,
  BASE_IMG_URL_220_330,
  BASE_IMG_URL_335_200,
} from 'src/app/core/utils/constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-media',
  templateUrl: './movie-media.component.html',
  styleUrls: ['./movie-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieMediaComponent implements OnInit, OnChanges {
  @Input() videos!: VideoResponse;
  @Input() images!: MediaImagesResponse;
  @Input() type: string = 'movie';
  @Input() id!: number;

  public readonly urlVieo = BASE_IMG_URL_335_200;
  public readonly urlBacdrop = BACK_DROP;
  public readonly urlPoster = BASE_IMG_URL_220_330;

  items: any[] = [];
  activeTab: 'videos' | 'backdrops' | 'posters' = 'videos';
  safeTrailerUrl: SafeResourceUrl | null = null;
  selectedTrailerKey: string | null = null;

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.changeTab('videos');
  }

  ngOnInit(): void {
    this.changeTab();
  }

  changeTab(tab: 'videos' | 'backdrops' | 'posters' = 'videos') {
    this.activeTab = tab;
    switch (tab) {
      case 'videos':
        this.items = this.videos.results.slice(0, 11);
        break;
      case 'backdrops':
        this.items = this.images.backdrops.slice(0, 11);
        break;
      case 'posters':
        this.items = this.images.posters.slice(0, 11);
        break;
    }
  }

  getVideoThumbnail(video: VideoResult): string {
    if (video.site === 'YouTube') {
      return `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;
    }

    return 'assets/images/video-default.jpg';
  }

  playTrailer(key: any): void {
    this.selectedTrailerKey = key;
    this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}?autoplay=1`
    );
    this.cdr.markForCheck();
  }

  closeTrailer(): void {
    this.safeTrailerUrl = null;
    this.selectedTrailerKey = null;
  }

  getSafeTrailerUrl(): SafeResourceUrl | null {
    return this.safeTrailerUrl;
  }

  viewMore(): string {
    return `https://www.themoviedb.org/${this.type}/${this.id}/${this.activeTab}`;
  }

  getDirectionCard(): boolean {
    switch (this.activeTab) {
      case 'videos':
        return this.videos.results.length > 11;
      case 'backdrops':
        return this.images.backdrops.length > 11;
      case 'posters':
        return this.images.posters.length > 11;
    }
  }
}
