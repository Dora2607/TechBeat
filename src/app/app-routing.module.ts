import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
 
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  {
    path: 'news',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
