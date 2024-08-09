import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', redirectTo: '/news/newstories', pathMatch: 'full' },
  { path: '', component: NewsComponent },
  { path: 'news/:apiType', component: NewsComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
