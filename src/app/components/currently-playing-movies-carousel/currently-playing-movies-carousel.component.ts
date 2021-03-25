import { Component, OnInit } from '@angular/core';
import { CurrentlyPlayingMoviesService } from 'src/app/services';

@Component({
  selector: 'app-currently-playing-movies-carousel',
  templateUrl: './currently-playing-movies-carousel.component.html',
  styleUrls: ['./currently-playing-movies-carousel.component.css']
})
export class CurrentlyPlayingMoviesCarouselComponent implements OnInit {
  
  public images = [];

  constructor(private _currentlyPlayingMoviesService: CurrentlyPlayingMoviesService) { 

  }

  ngOnInit(): void {
    this._currentlyPlayingMoviesService.fetchCurrentPlayingMovies().subscribe((data: any) => {
      this.images = data.data.map(element => element.poster_path);
    })
    //this.images = this._currentlyPlayingMoviesService.fetchCurrentPlayingMovies();
  }

}
