import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Keyword, KeywordResponse, MovieCredits, MovieDetails } from '../types/movie-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseurl}/movie/${id}?language=en-US`
    );
  }

  getTvDetails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseurl}/tv/${id}?language=en-US`
    );
  }

  getMoiveCredits(id: number): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(
      `${this.baseurl}/movie/${id}/credits?language=en-US`
    );
  }

  getKeywords(id: number, type: string = 'movie'): Observable<KeywordResponse> {
    return this.http.get<KeywordResponse>( `${this.baseurl}/${type}/${id}/keywords`);
  }
}
