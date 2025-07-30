import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Keyword,
  KeywordResponse,
  Credits,
  MovieDetails,
  TvDetails,
  ReviewsResponse,
  VideoResponse,
  MediaImagesResponse,
} from '../types/movie-details';
import { Observable, ObservableLike } from 'rxjs';

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

  getTvDetails(id: number): Observable<TvDetails> {
    return this.http.get<TvDetails>(`${this.baseurl}/tv/${id}?language=en-US`);
  }

  getCredits(id: number, type: string = 'movie'): Observable<Credits> {
    return this.http.get<Credits>(
      `${this.baseurl}/${type}/${id}/credits?language=en-US`
    );
  }

  getKeywords(id: number, type: string = 'movie'): Observable<KeywordResponse> {
    return this.http.get<KeywordResponse>(
      `${this.baseurl}/${type}/${id}/keywords`
    );
  }

  getReviews(id: number, type: string = 'movie'): Observable<ReviewsResponse> {
    return this.http.get<ReviewsResponse>(
      `${this.baseurl}/${type}/${id}/reviews`
    );
  }

  getVideos(id: number, type: string = 'movie'): Observable<VideoResponse> {
    return this.http.get<VideoResponse>(
      `${this.baseurl}/${type}/${id}/videos?language=en-US`
    );
  }

  getImages(id: number, type: string = 'movie'): Observable<MediaImagesResponse> {
    return this.http.get<MediaImagesResponse>(
      `${this.baseurl}/${type}/${id}/images`
    );
  }

  getRecommendations(id: number, type: string = 'movie') {
    
  }
}
