import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';
import { CarouselModule } from "primeng/carousel";
import { pages } from './pages';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    ...pages,
    ...components,
  ],
  imports: [CommonModule, ClientRoutingModule, SharedModule, CarouselModule],
})
export class ClientModule {}
