import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './pages/movie/movie.component';
import { MovieCreditsComponent } from './pages/movie-credits/movie-credits.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';

const routes: Routes = [
  { path: ':type/:tab', component: MovieComponent },
  { path: 'details/:type/:id', component: MovieDetailsComponent },
  { path: 'credits/:type/:id', component: MovieCreditsComponent },
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
