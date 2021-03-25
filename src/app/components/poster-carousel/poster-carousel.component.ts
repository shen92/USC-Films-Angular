import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomePageService } from 'src/app/services';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-poster-carousel',
  templateUrl: './poster-carousel.component.html',
  styleUrls: ['./poster-carousel.component.css']
})
export class PosterCarouselComponent implements OnInit, OnDestroy {
  
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
