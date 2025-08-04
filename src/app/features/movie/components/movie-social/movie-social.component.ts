import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ReviewsResponse } from '../../models/movie-details';
import { mockReviewsResponse } from 'src/app/core/utils/mockData';
import {
  BASE_AVATAR,
  BASE_IMG_URL_300_450,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';

@Component({
  selector: 'app-movie-social',
  templateUrl: './movie-social.component.html',
  styleUrls: ['./movie-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSocialComponent implements OnInit {
  // @Input() reviews: ReviewsResponse = mockReviewsResponse;
  @Input() reviews: ReviewsResponse = {
    id: 0,
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  };

  constructor() {}

  ngOnInit(): void {}

  getAvatarUrl(path: string | null): string {
    if (!path) return DEFAULT_IMG;
    // return `${path}`;
    return `${BASE_IMG_URL_300_450}${path}`;
  }
}
