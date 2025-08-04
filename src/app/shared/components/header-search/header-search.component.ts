import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearchComponent implements OnInit {

  @ViewChild('headerSearch') headerSearch!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  foucusSearch(): void {
    this.headerSearch.nativeElement.focus();
  }
}
