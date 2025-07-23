import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loadingSubject.asObservable();

  show(): void {
    setTimeout(() => this._loadingSubject.next(true)); 
  }

  hide(): void {
    setTimeout(() => this._loadingSubject.next(false));
  }
}
