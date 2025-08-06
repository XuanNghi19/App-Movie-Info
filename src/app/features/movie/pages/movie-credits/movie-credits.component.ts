import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsService } from '../../services/movie-details.service';
import { Credits } from '../../models/movie-details';
import {
  BASE_IMG_URL_58_87,
  BASE_IMG_URL_66_66,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { LoadingService } from 'src/app/core/services/loading.service';
import { finalize, take, tap } from 'rxjs';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.scss'],
})
export class MovieCreditsComponent implements OnInit {
  public readonly imgUrl = BASE_IMG_URL_66_66;
  public readonly imgHeaderUrl = BASE_IMG_URL_58_87;
  img = DEFAULT_IMG;
  date = '11/11/2025';
  title = 'This Movie';
  movieCredits!: Credits;
  id!: number;
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private movieDetailService: MovieDetailsService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show('overlay');
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.type = String(this.route.snapshot.paramMap.get('type'));

    this.route.queryParams.subscribe({
      next: (params) => {
        this.img = this.imgHeaderUrl + params['img'];
        this.date = params['releaseDate'];
        this.title = params['title'];
      },
    });

    this.movieDetailService
      .getCredits(this.id, this.type)
      .pipe(
        take(1),
        finalize(() => {
          this.loadingService.hide('overlay');
        })
      )
      .subscribe({
        next: (res) => {
          this.movieCredits = res;
        },
      });
  }

  back() {
    this.router.navigate([`/movie/details/${this.type}/${this.id}`]);
  }

  getImg(url: string | null) {
    if (!url) return DEFAULT_IMG;

    return this.imgUrl + url;
  }

  peopleDetails(id: number) {
    this.router.navigate([`/people/details/${id}`]);
  }
}
