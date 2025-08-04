import { Component, OnInit } from '@angular/core';
import { CreditItem, DisplayItem, PersonDetail } from '../../models/people';
import { PeopleService } from '../../services/people.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { finalize, forkJoin } from 'rxjs';
import {
  BASE_IMG_URL_130_195,
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
  public readonly knownForImg = BASE_IMG_URL_130_195;
  details!: PersonDetail;
  uniqueCredits: DisplayItem[] = [];
  groupedCredits!: {
    [year: string]: DisplayItem[];
  };
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
        let combinedCreditsRes = res.knowCredits;
        this.uniqueCredits = this.getUniqueCredits([
          ...combinedCreditsRes.cast,
          ...combinedCreditsRes.crew,
        ]);
        this.groupedCredits = this.groupByYear(this.uniqueCredits);
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

  getUniqueCredits(knowCredits: CreditItem[]): DisplayItem[] {
    const map = new Map<string, DisplayItem>();

    knowCredits.forEach((item) => {
      const key = `${item.media_type}-${item.id}`;
      if (!map.has(key)) {
        map.set(key, {
          id: item.id,
          media_type: item.media_type,
          title:
            item.media_type === 'movie'
              ? item.title || item.original_title
              : item.name || item.original_name,
          poster_path: item.poster_path ? item.poster_path : null,
          character: item.character ?? '--',
          release_date: item.release_date ?? undefined,
          first_air_date: item.first_air_date ?? undefined,
          episode_count:
            item.media_type === 'tv' ? item.episode_count : undefined,
        });
      }
    });

    return Array.from(map.values());
  }

  private groupByYear(credits: DisplayItem[]): {
    [year: string]: DisplayItem[];
  } {
    const grouped: { [year: string]: DisplayItem[] } = {};

    credits.forEach((item) => {
      const year =
        item.media_type === 'movie'
          ? item.release_date?.split('-')[0]
          : item.first_air_date?.split('-')[0] ?? '—';

      const yearKey = year || '—';

      if (!grouped[yearKey]) {
        grouped[yearKey] = [];
      }
      grouped[yearKey].push(item);
    });

    return grouped;
  }
}
