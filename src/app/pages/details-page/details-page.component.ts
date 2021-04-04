import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DetailsPageService } from 'src/app/services';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  public activatedRoute: string = "watch";
  public id: number = -1;
  public mediaType: string = "";
  public recommendationsTitle: string = "";
  public similarsTitle: string = "";
  public key: string = "";
  public title: string = "";
  public tagline: string = "";
  public duration: number = 0;
  public year: string = "";
  public description: string = "";
  public vote_average: string = "";
  public genres: any[] = [];
  public spokenLanguages: any[] = [];
  public casts: any[] = [];
  public reviews: any[] = [];
  public reviewsCount: number = 10;

  public recommendations = [];
  public similars = [];
  public video = {};

  public screenWidth: number;
  public screenHeight: number;
  public videoWidth: number;
  public videoHeight: number;

  public buttonLabel: string;
  public alert = false;
  public alertMessage: string;
  public alertClass: string;

  public reviewerPlaceHolder = 'src/assets/img/reviewer-placeholder.jpg'

  public youtubeHref: string = "";
  public twitterHref: string = "";
  public facebookHref: string = "";

  public modalOpen: boolean = false;
  public castId: number = -1;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private detailsPageService: DetailsPageService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.screenWidth = screen.width;
    this.screenHeight = screen.height;
    this.videoWidth = this.screenWidth < 576 ? this.screenWidth * 0.85 : this.screenWidth * 0.48;
    this.videoHeight = this.screenWidth < 576 ? this.screenHeight * 0.3 : this.screenHeight * 0.5;
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'), 10);
      const mediaType = params.get('mediaType');
      this.id = id;
      this.mediaType = mediaType;
      this.recommendationsTitle = `Recommended ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
      this.similarsTitle = `Similar ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
      this.detailsPageService.fetchRecommendedMedia(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.recommendations = response.data;
      });
      this.detailsPageService.fetchSimilarMedia(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.similars = response.data;
      });
      this.detailsPageService.fetchMediaVideo(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const video = response.data[0];
        this.key = video.key;
        const title = video.name
        this.youtubeHref =`https://www.youtube.com/watch?v=${this.key}`
        this.twitterHref = `https://twitter.com/intent/tweet?hashtags=USC%2CCSCI571%2CFightOn&text=Watch%20${title}&url=${encodeURIComponent(this.youtubeHref)}%0A`;
        this.facebookHref =`https://www.facebook.com/sharer/sharer.php?u=${this.youtubeHref}`
      });
      this.detailsPageService.fetchMediaDetails(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const details = response.data;
        this.title = details.title;
        this.tagline = details.tagline;
        this.year = mediaType === 'movie' ? details.release_date : details.first_air_date;
        this.vote_average = details.vote_average;
        this.duration = mediaType === 'movie' ? details.runtime : details.episode_run_time[0];
        this.genres = details.genres;
        this.spokenLanguages = details.spoken_languages;
        this.description = details.overview;
      });
      this.detailsPageService.fetchMediaCasts(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.casts = response.data;
      });
      this.detailsPageService.fetchMediaReviews(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.reviews = response.data;
      });
      const watchList = JSON.parse(window.localStorage.getItem('watchList'));
      const isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
      const currentIndex = watchList.findIndex(item => item.id === this.id)
      if(isInWatchList) {
        watchList.splice(currentIndex, 1);
      } 
      watchList.splice(0, 0, {media_type: this.mediaType, id: this.id});
      window.localStorage.setItem('watchList', JSON.stringify(watchList));
      this.buttonLabel = isInWatchList ? 'Remove from Watchlist' : 'Add to Watchlist';
      this.alertMessage = isInWatchList ? 'Removed from watchlist.' : 'Added to watchlist.';
      this.alertClass = isInWatchList ? 'danger' : 'success';
    });
  }

  ngOnDestroy(): void {
    
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onResize(e: any): void {
    this.screenWidth = e.target.innerWidth;
    this.screenHeight = e.target.innerHeight;
    this.videoWidth = this.screenWidth < 576 ? this.screenWidth * 0.85 : this.screenWidth * 0.48;
    this.videoHeight = this.screenWidth < 576 ? this.screenHeight * 0.3 : this.screenHeight * 0.5;
  }

  onAddButtonClick(): void {
    this.alert = true;
    let watchList = JSON.parse(window.localStorage.getItem('watchList'));
    let isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
    if(isInWatchList) {
        const index = watchList.findIndex(item => item.id === this.id);
        watchList.splice(index, 1);
    } else {
        watchList.splice(0, 0, {mediaType: this.mediaType, id: this.id});
    }
    window.localStorage.setItem('watchList', JSON.stringify(watchList));
    isInWatchList = !isInWatchList;
    this.buttonLabel = isInWatchList ? 'Remove from Watchlist' : 'Add to Watchlist';
  }

  onAlertClose(): void {
    this.alert = false;
    let watchList = JSON.parse(window.localStorage.getItem('watchList'));
    let isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
    this.alertMessage = isInWatchList ? 'Removed from watchlist.' : 'Added to watchlist.';
    this.alertClass = isInWatchList ? 'danger' : 'success';
  }

  onCardClick(content, id): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    this.castId = id;
  }

  getDuration(): string {
    const time = this.duration;
    const hours = (time / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours > 0 ? `${rhours}hr${rhours > 1 ? "s" : ""}` : ""} ${rminutes}mins`;
  }

  getYear(): string {
    return `${this.year.substr(0, 4)} |`
  }

  getRate(): string {
    return this.vote_average === "" ? "" : `★ ${this.vote_average} |`
  }

  getGenres(): string {
    return this.genres.map(genre => genre.name).join(', ')
  }
  
  getSpokenLanguages(): string{
    return this.spokenLanguages.map(language => language.name).join(', ')
  }

  
}
