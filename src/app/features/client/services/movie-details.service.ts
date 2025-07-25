import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovieDetails } from '../types/movie-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getMovieDatails(id: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${this.baseurl}/movie/${id}?language=en-US`
    );
  }
}
