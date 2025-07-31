import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DropdownItem, DropdownState } from 'src/app/shared/types/dropdown';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private _state = new BehaviorSubject<DropdownState>({
    position: { top: 0, left: 0 },
    items: [],
    visible: false,
  });

  readonly state$ = this._state.asObservable();

  show(position: { top: number; left: number }, items: DropdownItem[]) {
    setTimeout(() =>
      this._state.next({
        position,
        items,
        visible: true,
      })
    );
  }

  hide() {
    setTimeout(() =>
      this._state.next({
        ...this._state.value,
        visible: false,
      })
    );
  }
}
