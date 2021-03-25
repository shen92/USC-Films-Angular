import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentlyPlayingMoviesService } from 'src/app/services';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-currently-playing-movies-carousel',
  templateUrl: './currently-playing-movies-carousel.component.html',
  styleUrls: ['./currently-playing-movies-carousel.component.css']
})
export class CurrentlyPlayingMoviesCarouselComponent implements OnInit, OnDestroy {
  
  public images = [];
  public titles = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private currentlyPlayingMoviesService: CurrentlyPlayingMoviesService) { }

  ngOnInit(): void {
    this.currentlyPlayingMoviesService.fetchCurrentPlayingMovies().pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
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
