import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';
import { CarouselModule } from "primeng/carousel";

@NgModule({
  declarations: [
    HomeComponent,
    ClientLayoutComponent,
    ...components
  ],
  imports: [CommonModule, ClientRoutingModule, SharedModule, CarouselModule],
})
export class ClientModule {}
