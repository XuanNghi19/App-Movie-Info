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
  Recommendation,
  RecommendationResponse,
} from '../models/movie-details';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getTvDetails(id: number, type: string = 'movie'): Observable<TvDetails | MovieDetails> {
    return this.http.get<TvDetails | MovieDetails>(`${this.baseurl}/${type}/${id}?language=en-US`);
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

  getImages(
    id: number,
    type: string = 'movie'
  ): Observable<MediaImagesResponse> {
    return this.http.get<MediaImagesResponse>(
      `${this.baseurl}/${type}/${id}/images`
    );
  }

  getRecommendations(id: number, type: string = 'movie', language: string = 'en-US'): Observable<RecommendationResponse>  {
    return this.http.get<RecommendationResponse>(
      `${this.baseurl}/${type}/${id}/recommendations?language=${language}&page=1`
    );
  }
}
