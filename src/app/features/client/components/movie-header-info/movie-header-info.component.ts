import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDetails } from '../../types/movie-details';
import { BASE_IMG_URL_300_450 } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-movie-header-info',
  templateUrl: './movie-header-info.component.html',
  styleUrls: ['./movie-header-info.component.scss'],
})
export class MovieHeaderInfoComponent implements OnInit {
  public readonly urlPoster = BASE_IMG_URL_300_450;

  @Input() movie!: MovieDetails;

  constructor() {}

  ngOnInit(): void {}


}
