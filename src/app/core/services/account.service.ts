import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShowsState } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly baseurl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getShowsState(id: number, type: string = 'movie'): Observable<ShowsState> {
    return this.http.get<ShowsState>(
      `${this.baseurl}/${type}/${id}/account_states`
    );
  }
}
