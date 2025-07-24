import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
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
