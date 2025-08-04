import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NextEpisode, Season } from '../../models/movie-details';
import { BASE_IMG_URL_130_195, DEFAULT_IMG } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-crr-tv-season',
  templateUrl: './crr-tv-season.component.html',
  styleUrls: ['./crr-tv-season.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrrTvSeasonComponent implements OnInit {
  public readonly imgUrl = BASE_IMG_URL_130_195;
  public readonly defaultImg = DEFAULT_IMG;

  @Input() season!: Season;
  @Input() nameShow!: string;
  @Input() nextEpisodeToAir!: NextEpisode | null;

  constructor() {}

  ngOnInit(): void {}

  get poster(): string {
    if (this.season.poster_path === null) return this.defaultImg;
    return this.imgUrl + this.season.poster_path;
  }
}
