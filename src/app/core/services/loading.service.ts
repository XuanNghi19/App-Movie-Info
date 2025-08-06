import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // private _loadingSubject = new BehaviorSubject<boolean>(false);
  // public readonly loading$ = this._loadingSubject.asObservable();

  // show(): void {
  //   setTimeout(() => this._loadingSubject.next(true));
  // }

  // hide(): void {
  //   setTimeout(() => this._loadingSubject.next(false));
  // }

  private _loadingStates = new Map<string, BehaviorSubject<boolean>>();

  private _getSubject(key: string): BehaviorSubject<boolean> {
    if (!this._loadingStates.has(key)) {
      this._loadingStates.set(key, new BehaviorSubject<boolean>(false));
    }
    return this._loadingStates.get(key)!;
  }

  loading$(key: string): Observable<boolean> {
    return this._getSubject(key).asObservable();
  }

  clearAll(): void {
    for (const subject of this._loadingStates.values()) {
      subject.next(false);
    }
  }

  get isAnyLoading$(): Observable<boolean> {
    const subjects = Array.from(this._loadingStates.values()).map((s) =>
      s.asObservable()
    );
    return new BehaviorSubject(null).pipe(
      map(() => Array.from(this._loadingStates.values()).some((s) => s.value))
    );
  }

  show(key: string): void {
    setTimeout(() => this._getSubject(key).next(true));
  }

  hide(key: string): void {
    setTimeout(() => this._getSubject(key).next(false));
  }
}
