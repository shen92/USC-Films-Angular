import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HomePageService } from 'src/app/services';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit, OnDestroy {
  public isDesktop: boolean;
  public activatedRoute: string = "home";

  public watchList: any[] = [];
  public currentlyPlayingMovies: any[] = [];
  public popularMovies: any[] = [];
  public topRatedMovies: any[] = [];
  public trendingMovies: any[] = [];
  public popularTvShows: any[] = [];
  public topRatedTvShows: any[] = [];
  public trendingTvShows: any[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private breakpointObserver: BreakpointObserver, private homePageService: HomePageService) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      this.isDesktop = result.matches;
    });
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
    const watchList = JSON.parse(window.localStorage.getItem('watchList'));
    console.log(watchList)
    this.watchList = watchList;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
