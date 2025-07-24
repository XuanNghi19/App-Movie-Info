import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeComponent } from './home/home.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderSearchComponent } from 'src/app/components/header-search/header-search.component';

@NgModule({
  declarations: [
    HomeComponent,
    ClientLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeaderSearchComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
