import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  TrendingMovie,
  Response,
  TVShow,
  UpcomingResponse,
  UpcomingMovie,
  TrendingPerson,
  MovieVideosResponse,
} from '../types/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getTrendingMovies(
    timeWindow: string = 'day',
    language: string = 'en-US'
  ): Observable<Response<TrendingMovie>> {
    return this.http.get<Response<TrendingMovie>>(
      `${this.baseurl}/trending/movie/${timeWindow}?language=${language}`
    );
  }

  getLatestTrailer(
    language: string = 'en-US'
  ): Observable<UpcomingResponse<UpcomingMovie>> {
    return this.http.get<UpcomingResponse<UpcomingMovie>>(
      `${this.baseurl}/movie/upcoming?language=${language}&page=1`
    );
  }

  getMovieTrailerVideo(id: number): Observable<MovieVideosResponse> {
    return this.http.get<MovieVideosResponse>(
      `${this.baseurl}/movie/${id}/videos?language=en-US`
    );
  }

  getPopularTvShow(
    timeWindow: string = 'day',
    language: string = 'en-US'
  ): Observable<Response<TVShow>> {
    return this.http.get<Response<TVShow>>(
      `${this.baseurl}/trending/tv/${timeWindow}?language=${language}`
    );
  }
}
