import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { TrendingPerson } from '../../../home/models/home';
import { finalize, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Response } from 'src/app/core/model/response';

@Component({
  selector: 'app-popular-people',
  templateUrl: './popular-people.component.html',
  styleUrls: ['./popular-people.component.scss']
})
export class PopularPeopleComponent implements OnInit {

  res!: Response<TrendingPerson>;
  knowFors: string[] = [];
  currentPage = 1;

  constructor(
    private peopleService: PeopleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number) {
    window.scrollTo({top: 0, behavior: 'smooth'})
    this.loadingService.show('overlay');
    this.peopleService
      .getPopularPerson(page)
      .pipe(finalize(() => this.loadingService.hide('overlay')))
      .subscribe({
        next: (res) => {
          this.res = res;
          this.currentPage = res.page;
          this.res.results.map((res) => {
            let knows: string[] = [];
            res.known_for.map((item) => {
              knows.push(item.title ?? item.name ?? '')
            });
            this.knowFors.push(knows.join(', '));
          });
        },
      });
  }
}
