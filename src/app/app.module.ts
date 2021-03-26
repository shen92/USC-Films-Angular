import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  NavBarComponent, 
  PosterCarouselComponent, 
  SwimmingPoolComponent, 
  FooterComponent 
} from './components';
import { HomePageService } from './services';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    NavBarComponent,
    PosterCarouselComponent,
    SwimmingPoolComponent,
    FooterComponent,
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
