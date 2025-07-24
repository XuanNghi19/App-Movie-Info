import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { components } from './components';
import { ScorePipe } from './pipe/score.pipe';
import { pipes } from './pipe';

const primeng = [CarouselModule];
@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, RouterModule, ...primeng],
  exports: [...components, ...pipes],
})
export class SharedModule {}
