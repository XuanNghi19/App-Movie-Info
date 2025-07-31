import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RecommendationResponse } from '../../types/movie-details';
import { BASE_IMG_URL_250_141, DEFAULT_IMG } from 'src/app/core/utils/constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-recommendations',
  templateUrl: './movie-recommendations.component.html',
  styleUrls: ['./movie-recommendations.component.scss']
})
export class MovieRecommendationsComponent implements OnInit {

  @Input() recomendations!: RecommendationResponse;
  @Output() go = new EventEmitter<{id: number, type: string}>();
  private readonly urlImg = BASE_IMG_URL_250_141;
  private readonly deftImg = DEFAULT_IMG;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(id: number, type: string = 'movie') {
    this.go.emit({id: id, type: type});
  }

  getImg(url: string | null): string {
    return url ? this.urlImg + url : this.deftImg;
  }
}
