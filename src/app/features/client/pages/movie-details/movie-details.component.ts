import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from '../../services/movie-details.service';
import { MovieDetails } from '../../types/movie-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieDetail!: MovieDetails;

  constructor(private movieDetailsService: MovieDetailsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieDetailsService.getMovieDatails(id).subscribe({
      next: res => {
        this.movieDetail = res;
      }
    });
  }

}
