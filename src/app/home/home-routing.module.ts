import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'news/:apiType', component: NewsComponent },
  { path: '', redirectTo: '/news/newstories.json', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
