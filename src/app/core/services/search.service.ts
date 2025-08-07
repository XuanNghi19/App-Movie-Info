import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovieResult, MultiResult, PersonResult, TvResult } from '../model/search';
import { Response } from '../model/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  searchMovie(query: string): Observable<Response<MovieResult>> {
    return this.http.get<Response<MovieResult>>(`${this.baseurl}/search/movie`, {
      params: { query: query },
    });
  }

  searchPerson(query: string): Observable<Response<PersonResult>> {
    return this.http.get<Response<PersonResult>>(`${this.baseurl}/search/person`, {
      params: { query: query },
    });
  }

  searchTV(query: string): Observable<Response<TvResult>> {
    return this.http.get<Response<TvResult>>(`${this.baseurl}/search/tv`, {
      params: { query: query },
    });
  }

  searchMulti(query: string): Observable<Response<MultiResult>> {
    return this.http.get<Response<MultiResult>>(`${this.baseurl}/search/multi`, {
      params: { query: query },
    });
  }
}
