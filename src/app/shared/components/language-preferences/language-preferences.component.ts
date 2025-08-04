import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { finalize } from 'rxjs';
import { LanguageOption } from 'src/app/core/model/language';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-language-preferences',
  templateUrl: './language-preferences.component.html',
  styleUrls: ['./language-preferences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagePreferencesComponent implements OnInit, OnChanges {
  @Input() languages: LanguageOption[] = [];
  defaultLanguage: string = 'vi';
  fallbackLanguage: string = 'en';
  isLoadingLanguages = true;

  constructor(private languageService: LanguageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.languages.length) return;
    this.isLoadingLanguages = false;
  }


  ngOnInit(): void {
    this.reset();
  }

  onDefaultChange(lang: string) {
    this.defaultLanguage = lang;
  }

  onFallbackChange(lang: string) {
    this.fallbackLanguage = lang;
  }

  reset() {
    this.defaultLanguage = 'vi';
    this.fallbackLanguage = 'en';
  }
}
