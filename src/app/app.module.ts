import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent, MoviePosterCarouselComponent, SwimmingPoolComponent } from './components';
import { HomePageService } from './services';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    NavBarComponent,
    MoviePosterCarouselComponent,
    SwimmingPoolComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    HomePageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
