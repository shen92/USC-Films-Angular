import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  NavBarComponent, 
  PosterCarouselComponent, 
  SwimmingPoolComponent, 
  VideoPlayerComponent,
  CastModalComponent,
  FooterComponent 
} from './components';
import { DetailsPageService, HomePageService, SearchService } from './services';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    NavBarComponent,
    PosterCarouselComponent,
    SwimmingPoolComponent,
    FooterComponent,
    VideoPlayerComponent,
    CastModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [
    HomePageService,
    DetailsPageService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
