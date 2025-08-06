import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrendingPerson } from '../../home/models/home';
import { environment } from 'src/environments/environment';
import { CombinedCredits, PersonDetail } from '../models/people';
import { Response } from 'src/app/core/model/response';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getPopularPerson(
    page: number = 1,
    language: string = 'en-US'
  ): Observable<Response<TrendingPerson>> {
    return this.http.get<Response<TrendingPerson>>(
      `${this.baseurl}/person/popular?language=${language}&page=${page}`
    );
  }

  getCombinedCredits(id: number): Observable<CombinedCredits> {
    return this.http.get<CombinedCredits>(
      `${this.baseurl}/person/${id}/combined_credits?language=en-US`
    );
  }

  getDetails(id: number): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(`${this.baseurl}/person/${id}?language=en-US`);
  }
}
