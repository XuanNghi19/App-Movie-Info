import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Options } from 'ng5-slider';
import { distinctUntilChanged, fromEvent, map, throttleTime } from 'rxjs';
import { LanguageOption } from 'src/app/core/model/language';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss'],
})
export class MovieFilterComponent implements AfterViewInit, AfterViewInit {
  @Input() genresList: any[] = [];
  @Output() filterChange = new EventEmitter<any>();

  @ViewChild('searchBtn') searchBtn!: ElementRef;
  showFixedSearchBtn = false;
  formChanged = false;

  filterForm!: FormGroup;
  isSortOpen = true;
  isFilterOpen = true;
  languages: LanguageOption[] = [];

  sortOptions = [
    { label: 'Popularity Descending', value: 'popularity.desc' },
    { label: 'Popularity Ascending', value: 'popularity.asc' },
    { label: 'Release Date Descending', value: 'release_date.desc' },
    { label: 'Release Date Ascending', value: 'release_date.asc' },
    { label: 'Rating Descending', value: 'vote_average.desc' },
    { label: 'Rating Ascending', value: 'vote_average.asc' },
  ];
  scoreSliderOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 0.5,
  };

  votesSliderOptions: Options = {
    floor: 0,
    ceil: 500,
    step: 10,
  };

  runtimeSliderOptions: Options = {
    floor: 0,
    ceil: 360,
    step: 15,
  };

  selectedGenres: number[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const languagesStr = localStorage.getItem('languages');
    this.languages = languagesStr ? JSON.parse(languagesStr) : [];

    this.filterForm = this.fb.group({
      sort_by: ['popularity.desc'],
      search_all_releases: [true],
      release_date_from: [''],
      release_date_to: [''],
      with_original_language: ['en'],
      vote_average_gte: [0],
      vote_average_lte: [10],
      vote_count_gte: [0],
      with_runtime_gte: [0],
      with_runtime_lte: [360],
      with_keywords: [''],
    });

    const initialValue = this.filterForm.getRawValue();

    this.filterForm.valueChanges.subscribe((currentValue) => {
      this.formChanged =
        JSON.stringify(currentValue) !== JSON.stringify(initialValue);

      if (this.formChanged) {
        this.showFixedSearchBtn = this.isSearchButtonOutOfView();
        this.emitFilter();
      }
    });
  }

  toggleGenre(genre: any): void {
    const index = this.selectedGenres.indexOf(genre.id);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre.id);
    }

    this.formChanged = !!this.selectedGenres.length;
    this.showFixedSearchBtn = this.isSearchButtonOutOfView();

    this.emitFilter();
  }

  emitFilter(): void {
    const filters = this.getQueryParamsFromForm();
    this.filterChange.emit(filters);
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(200),
        map(() => this.isSearchButtonOutOfView()),
        distinctUntilChanged()
      )
      .subscribe((isOutOfView) => {
        this.showFixedSearchBtn = isOutOfView && this.formChanged;
      });
  }

  isSearchButtonOutOfView(): boolean {
    if (!this.searchBtn) return false;
    const rect = this.searchBtn.nativeElement.getBoundingClientRect();
    return rect.top > window.innerHeight || rect.bottom < 0;
  }

  getQueryParamsFromForm(): any {
    const {
      sort_by,
      release_date_from,
      release_date_to,
      search_all_releases,
      with_original_language,
      vote_average_gte,
      vote_average_lte,
      vote_count_gte,
      with_runtime_gte,
      with_runtime_lte,
      with_keywords,
    } = this.filterForm.value;

    const filters: any = {
      sort_by,
      with_genres: this.selectedGenres.join(','),
      with_original_language,
      vote_average_gte,
      vote_average_lte,
      vote_count_gte,
      with_runtime_gte,
      with_runtime_lte,
    };

    if (!search_all_releases) {
      filters['release_date.gte'] = release_date_from;
      filters['release_date.lte'] = release_date_to;
    }

    if (with_keywords) {
      filters.with_keywords = with_keywords;
    }

    return filters;
  }

  getShowFixedSearchBtn(): boolean {
    return this.formChanged && this.showFixedSearchBtn;
  }
}
