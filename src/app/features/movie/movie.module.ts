import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { pages } from './pages';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';


@NgModule({
  declarations: [
    ...components,
    ...pages,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MovieRoutingModule,
    NgSelectModule,
    Ng5SliderModule,
    SharedModule
  ]
})
export class MovieModule { }
