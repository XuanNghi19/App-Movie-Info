import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageOption } from '../model/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly baseUrl = environment.baseurl;

  constructor(private http: HttpClient) {}

  getSupportedLanguages(): Observable<LanguageOption[]> {
    const url = `${this.baseUrl}/configuration/languages`;
    return this.http.get<LanguageOption[]>(url);
  }
}
