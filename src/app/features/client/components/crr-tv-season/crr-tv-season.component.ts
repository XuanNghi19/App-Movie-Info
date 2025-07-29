import { Component, Input, OnInit } from '@angular/core';
import { Season } from '../../types/movie-details';
import { BASE_IMG_URL_130_195 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-crr-tv-season',
  templateUrl: './crr-tv-season.component.html',
  styleUrls: ['./crr-tv-season.component.scss']
})
export class CrrTvSeasonComponent implements OnInit {

  public readonly imgUrl = BASE_IMG_URL_130_195;

  @Input() season!: Season;

  constructor() { }

  ngOnInit(): void {
  }

}
