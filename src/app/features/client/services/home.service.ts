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

  getPopularTvShow(
    page: number = 1,
    language: string = 'en-US'
  ): Observable<Response<TVShow>> {
    return this.http.get<Response<TVShow>>(
      `${this.baseurl}/discover/tv?include_adult=false&language=${language}&page=${page}&sort_by=popularity.desc`
    );
  }

  getPopularPerson(
    page: number = 1,
    language: string = 'en-US'
  ): Observable<Response<TrendingPerson>> {
    return this.http.get<Response<TrendingPerson>>(
      `${this.baseurl}/person/popular?language=${language}&page=${page}`
    );
  }
}
