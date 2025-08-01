import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieCreditsComponent } from './pages/movie-credits/movie-credits.component';
import { PopularPeopleComponent } from './pages/popular-people/popular-people.component';
import { PeopleDetailsComponent } from './pages/people-details/people-details.component';
import { title } from 'process';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' },
      },
      {
        path: 'movie-details/:type/:id',
        component: MovieDetailsComponent,
        data: { title: 'Details' },
      },
      {
        path: 'movie-details/full-credits/:type/:id',
        component: MovieCreditsComponent,
        data: { title: 'Credits' },
      },
      {
        path: 'people/popular-people',
        component: PopularPeopleComponent,
        data: { title: 'Popular Peoples' },
      },
      {
        path: 'people/details/:id',
        component: PeopleDetailsComponent,
        data: { title: 'People Details' },
      },
    ],
  },
  {
    path: 'client',
    redirectTo: 'client/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
