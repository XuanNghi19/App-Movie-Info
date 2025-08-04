import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './pages/people/people.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { pages } from './pages';
import { components } from './components';


@NgModule({
  declarations: [
    ...components,
    ...pages
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ]
})
export class PeopleModule { }
