import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './pages/people/people.component';
import { PeopleDetailsComponent } from './pages/people-details/people-details.component';
import { PopularPeopleComponent } from './pages/popular-people/popular-people.component';

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'details/:id', component: PeopleDetailsComponent },
  { path: 'popular', component: PopularPeopleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
