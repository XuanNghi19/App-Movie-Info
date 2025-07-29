import { Component, Input, OnInit } from '@angular/core';
import { Season } from '../../types/movie-details';

@Component({
  selector: 'app-crr-tv-season',
  templateUrl: './crr-tv-season.component.html',
  styleUrls: ['./crr-tv-season.component.scss']
})
export class CrrTvSeasonComponent implements OnInit {

  @Input() season!: Season;

  constructor() { }

  ngOnInit(): void {
  }

}
