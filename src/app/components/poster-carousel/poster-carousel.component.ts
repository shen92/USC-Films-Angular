import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster-carousel',
  templateUrl: './poster-carousel.component.html',
  styleUrls: ['./poster-carousel.component.css']
})
export class PosterCarouselComponent {
  @Input() currentlyPlayingMovies: any[];
}
