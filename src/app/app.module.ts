import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent, CurrentlyPlayingMoviesCarouselComponent } from './components';
import { CurrentlyPlayingMoviesService } from './services';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    NavBarComponent,
    CurrentlyPlayingMoviesCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CurrentlyPlayingMoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
