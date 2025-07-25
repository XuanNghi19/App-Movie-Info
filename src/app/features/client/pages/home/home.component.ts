import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { TrendingMovie, TrendingPerson, TVShow, UpcomingMovie } from '../../types/home';
import { BASE_IMG_URL_335_200 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public readonly imgBaseUrl_355_200 = BASE_IMG_URL_335_200;

  selectedTab = 'day';
  movieList: TrendingMovie[] = [];
  trailerList: UpcomingMovie[] = [];
  popularTvShowList: TVShow[] = [];
  popularPepleList: TrendingPerson[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.onTrendingTabChange();
    this.onLastestTrailers();
    this.onPopularTvShowList();
    this.onPopularPeople();
  }

  onTrendingTabChange = (tab: string = 'day') => {
    this.selectedTab = tab;
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

  onPopularTvShowList() {
    this.homeService.getPopularTvShow().subscribe({
      next: (res) => {
        this.popularTvShowList = res.results;
      },
    });
  }

  onPopularPeople() {
    this.homeService.getPopularPerson().subscribe({
      next: (res) => {
        this.popularPepleList = res.results;
      },
    });
  }
}
