import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderSearchComponent } from 'src/app/features/client/components/header-search/header-search.component';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {

  @ViewChild('searchRef') searchRef!: HeaderSearchComponent;

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  foucusSearch(): void {
    this.searchRef.foucusSearch();
  }
}
