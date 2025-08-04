import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { pages } from './pages';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ...components,
    ...pages
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ]
})
export class MovieModule { }
