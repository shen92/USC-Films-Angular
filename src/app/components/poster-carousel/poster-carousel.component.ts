import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster-carousel',
  templateUrl: './poster-carousel.component.html',
  styleUrls: ['./poster-carousel.component.css']
})
export class PosterCarouselComponent {
  @Input() currentlyPlayingMovies: any[];
  @Input() isDesktop: boolean

  constructor(private router: Router) { }

  onImageClick(id): void {
    this.router.navigate( ['watch', 'movie', id]);
  }
}
