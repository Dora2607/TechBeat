import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NewsComponent } from './news/news.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    SharedModule
  ]
})
export class HomeModule { }
