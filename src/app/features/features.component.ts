import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderSearchComponent } from '../shared/components/header-search/header-search.component';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {
  @ViewChild('searchRef') searchRef!: HeaderSearchComponent;

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}

  foucusSearch(): void {
    this.searchRef.foucusSearch();
  }
}
