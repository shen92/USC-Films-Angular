import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'src/app/services';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  public currentlyPlayingMovies = [];
  public popularMovies = [];
  public topRatedMovies = [];
  public trendingMovies = [];
  public popularTvShows = [];
  public topRatedTvShows = [];
  public trendingTvShows = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private homePageService: HomePageService) { 
  }

  ngOnInit(): void {
    this.homePageService.fetchCurrentPlayingMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.currentlyPlayingMovies = response.data;
    })
  }

}
