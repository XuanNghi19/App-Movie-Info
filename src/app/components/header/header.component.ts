import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('movies') movies!: ElementRef;
  @ViewChild('tvShows') tvShows!: ElementRef;
  @ViewChild('people') people!: ElementRef;
  @ViewChild('more') more!: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }

}
