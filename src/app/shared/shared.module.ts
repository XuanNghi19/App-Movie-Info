import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { components } from './components';
import { pipes } from './pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const primeng = [CarouselModule];
@NgModule({
  declarations: [...components, ...pipes],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ...primeng],
  exports: [...components, ...pipes],
})
export class SharedModule {}
