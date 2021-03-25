import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomePageService } from 'src/app/services';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-poster-carousel',
  templateUrl: './movie-poster-carousel.component.html',
  styleUrls: ['./movie-poster-carousel.component.css']
})
export class MoviePosterCarouselComponent implements OnInit, OnDestroy {
  
  public images = [];
  public titles = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private posterCarouselService: HomePageService) { }

  ngOnInit(): void {
    this.posterCarouselService.fetchCurrentPlayingMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      response.data.forEach(movie => {
        this.images.push(movie.poster_path);
        this.titles.push(movie.title)
      });
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
