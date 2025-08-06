import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { pages } from '../user/pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { components } from './components';

@NgModule({
  declarations: [...pages, ...components],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
