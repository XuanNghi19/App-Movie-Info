import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  { path: '', redirectTo: 'client/home', pathMatch: 'full' },
  { path: 'client', redirectTo: 'client/home', pathMatch: 'full' },
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'client',
        loadChildren: () =>
          import('./client/client.module').then((m) => m.ClientModule),
      },
      { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
