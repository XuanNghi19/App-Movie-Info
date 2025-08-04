import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Response } from '../models/movie';
import { TvShow } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getMovie(page: number, tab: string): Observable<Response<Movie>> {
    return this.http.get<Response<Movie>>(
      `${this.baseurl}/movie/${tab}?language=en-US&page=${page}`
    );
  }

  getTv(page: number, tab: string): Observable<Response<TvShow>> {
    return this.http.get<Response<TvShow>>(
      `${this.baseurl}/tv/${tab}?language=en-US&page=${page}`
    );
  } 
}
