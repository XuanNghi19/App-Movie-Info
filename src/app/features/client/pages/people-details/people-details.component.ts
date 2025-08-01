import { Component, OnInit } from '@angular/core';
import { PersonDetail } from '../../types/people';
import { PeopleService } from '../../services/people.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { finalize, forkJoin } from 'rxjs';
import {
  BASE_IMG_URL_300_450,
  DEFAULT_IMG,
} from 'src/app/core/utils/constants';
import { splitParagraphs } from 'src/app/core/utils/functions';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss'],
})
export class PeopleDetailsComponent implements OnInit {
  private readonly defltImg = DEFAULT_IMG;
  private readonly urlImg = BASE_IMG_URL_300_450;
  details!: PersonDetail;
  knowCredits: number = 0;
  id!: number;

  biography: string[] = [];
  isExpanded: boolean = false;
  showToggle: boolean = false;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute,
    private loadingServie: LoadingService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadingServie.show();

    let resquest$ = forkJoin({
      knowCredits: this.peopleService.getCombinedCredits(this.id),
      details: this.peopleService.getDetails(this.id),
    });

    resquest$.pipe(finalize(() => this.loadingServie.hide())).subscribe({
      next: (res) => {
        let knowRes = res.knowCredits;
        this.knowCredits = knowRes.cast.length + knowRes.crew.length;
        this.details = res.details;

        this.biography = splitParagraphs(this.details.biography);
        this.checkNeedToggle();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get img(): string {
    return this.details.profile_path
      ? this.urlImg + this.details.profile_path
      : this.defltImg;
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  checkNeedToggle() {
    this.showToggle = this.biography.length > 2;
  }
}
