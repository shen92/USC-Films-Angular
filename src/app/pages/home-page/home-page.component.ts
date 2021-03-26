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
    this.homePageService.fetchPopularMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.popularMovies = response.data;
    });
    this.homePageService.fetchTopRatedMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.topRatedMovies = response.data;
    });
    this.homePageService.fetchTrendingMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.trendingMovies = response.data;
    });
    this.homePageService.fetchPopularTVShows().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      const result = [];
      response.data.forEach(tvShow => {
        tvShow.title = tvShow.name;
        result.push(tvShow)
      })
      this.popularTvShows = result;
    });
    this.homePageService.fetchTopRatedTVShows().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      const result = [];
      response.data.forEach(tvShow => {
        tvShow.title = tvShow.name;
        result.push(tvShow)
      })
      this.topRatedTvShows = result;
    });
    this.homePageService.fetchTrendingTVShows().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      const result = [];
      response.data.forEach(tvShow => {
        tvShow.title = tvShow.name;
        result.push(tvShow)
      })
      this.trendingTvShows = result;
    });
  }

}
