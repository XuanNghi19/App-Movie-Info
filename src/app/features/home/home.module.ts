import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';
import { pages } from './pages';
import { ResultsSearchComponent } from './pages/results-search/results-search.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [...components, ...pages, ResultsSearchComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
