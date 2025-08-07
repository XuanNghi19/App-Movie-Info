import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/model/response';
import { environment } from 'src/environments/environment';
import { Movie, TvShow } from '../models/watch-list';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getWatchList(type: string = 'movies', list: string = 'watchlist', params: any): Observable<Response<Movie | TvShow>> {
    return this.http.get<Response<Movie | TvShow>>(`${this.baseurl}/account/${environment.user_id}/${list}/${type}`, { params: params });
  }
}
