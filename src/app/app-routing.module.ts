import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent, WatchListPageComponent } from './pages'

const routes: Routes = [
  { path: '', component: HomePageComponent}, //default route
  { path: 'mylist', component: WatchListPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [ HomePageComponent, WatchListPageComponent ]
