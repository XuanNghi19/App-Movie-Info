import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayLoadingComponent } from './components/loading/overlay-loading/overlay-loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OverlayLoadingComponent, NotFoundComponent, DropdownComponent],
  imports: [CommonModule, RouterModule],
  exports: [OverlayLoadingComponent, NotFoundComponent],
})
export class SharedModule {}
