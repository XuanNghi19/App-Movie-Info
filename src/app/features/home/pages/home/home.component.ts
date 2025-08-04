import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import {
  TrendingMovie,
  TrendingPerson,
  TVShow,
  UpcomingMovie,
} from '../../models/home';
import {
  BASE_IMG_URL_138_175,
  BASE_IMG_URL_335_200,
} from 'src/app/core/utils/constants';
import { BehaviorSubject, finalize, forkJoin, Observable, timeoutWith } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { PeopleService } from '../../../people/services/people.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public readonly imgBaseUrl_355_200 = BASE_IMG_URL_335_200;

  trendingTab = 'day';
  tvTrendingTab = 'day';
  movieList: TrendingMovie[] = [];
  trailerList: UpcomingMovie[] = [];
  popularTvShowList: TVShow[] = [];
  popularPepleList: TrendingPerson[] = [];

  constructor(private homeService: HomeService, private loadingService: LoadingService, private peopleServie: PeopleService) {}

  ngOnInit(): void {
    this.loadAllHomeData();
  }

  onTrendingTabChange = (tab: string = 'day') => {
    this.trendingTab = tab;
    this.homeService.getTrendingMovies(tab, 'vi').subscribe({
      next: (res) => {
        this.movieList = res.results;
      },
    });
  };

  onLastestTrailers() {
    this.homeService.getLatestTrailer().subscribe({
      next: (res) => {
        this.trailerList = res.results;
      },
    });
  }

  onPopularTvShowList = (tab: string = 'day') => {
    this.tvTrendingTab = tab;
    this.homeService.getPopularTvShow(this.tvTrendingTab).subscribe({
      next: (res) => {
        this.popularTvShowList = res.results;
      },
    });
  };

  onPopularPeople() {
    this.peopleServie.getPopularPerson().subscribe({
      next: (res) => {
        this.popularPepleList = res.results;
      },
    });
  }

  loadAllHomeData() {
    this.loadingService.show();
    forkJoin({
      trendingMovies: this.homeService.getTrendingMovies(
        this.trendingTab || 'day',
        'vi'
      ),
      latestTrailers: this.homeService.getLatestTrailer(),
      popularTvShows: this.homeService.getPopularTvShow(
        this.tvTrendingTab || 'day'
      ),
      popularPeople: this.peopleServie.getPopularPerson(),
    }).pipe(finalize(() => this.loadingService.hide())).subscribe({
      next: (res) => {
        this.movieList = res.trendingMovies.results;
        this.trailerList = res.latestTrailers.results;
        this.popularTvShowList = res.popularTvShows.results;
        this.popularPepleList = res.popularPeople.results;
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi load dữ liệu:', err);
      },
    });
  }
}
