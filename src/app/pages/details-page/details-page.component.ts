import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DetailsPageService } from 'src/app/services';
import { CastModalComponent } from 'src/app/components';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  public isDesktop: boolean;
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

  public videoWidth: number;
  public videoHeight: number;

  public buttonLabel: string;
  public alert = false;
  public alertMessage: string;
  public alertClass: string;

  public youtubeHref: string = "";
  public twitterHref: string = "";
  public facebookHref: string = "";

  public reviewerPlaceholder: string = "assets/img/reviewer-placeholder.jpg"; //TODO

  public modalOpen: boolean = false;
  public castId: number = -1;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private breakpointObserver: BreakpointObserver, private detailsPageService: DetailsPageService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      this.isDesktop = result.matches;
      const width = screen.width;
      const height = screen.height;
      this.videoWidth = width > 1000 ? width * 0.45 : width * 0.85;
      this.videoHeight = width > 1000 ? height * 0.5 : height * 0.3;
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'), 10);
      const mediaType = params.get('mediaType');
      this.id = id;
      this.mediaType = mediaType;
      this.recommendationsTitle = `Recommended ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
      this.similarsTitle = `Similar ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`
      const watchList = JSON.parse(window.localStorage.getItem('watchList'));
        const isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
        const currentIndex = watchList.findIndex(item => item.id === this.id);
        this.buttonLabel = isInWatchList ?  'Remove from Watchlist' : 'Add to Watchlist';
      this.detailsPageService.fetchMediaDetails(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const details = response.data;
        this.title = details.title;
        this.detailsPageService.fetchMediaVideo(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
          const video = response.data[0];
          this.key = video.key;
          this.youtubeHref =`https://www.youtube.com/watch?v=${this.key}`
          this.twitterHref = `https://twitter.com/intent/tweet?hashtags=USC%2CCSCI571%2CFightOn&text=Watch%20${this.title}&url=${encodeURIComponent(this.youtubeHref)}%0A`;
          this.facebookHref =`https://www.facebook.com/sharer/sharer.php?u=${this.youtubeHref}`
        });
        this.tagline = details.tagline;
        this.year = mediaType === 'movie' ? details.release_date : details.first_air_date;
        this.vote_average = details.vote_average;
        this.duration = mediaType === 'movie' ? details.runtime : details.episode_run_time[0];
        this.genres = details.genres;
        this.spokenLanguages = details.spoken_languages;
        this.description = details.overview;
        if(isInWatchList) {
          watchList.splice(currentIndex, 1);
        } 
        watchList.splice(0, 0, details);
        window.localStorage.setItem('watchList', JSON.stringify(watchList));
      });
      
      this.detailsPageService.fetchMediaCasts(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.casts = response.data;
      });
      this.detailsPageService.fetchMediaReviews(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.reviews = response.data;
        this.reviewsCount = response.count;
      });
      this.detailsPageService.fetchRecommendedMedia(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.recommendations = response.data;
      });
      this.detailsPageService.fetchSimilarMedia(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.similars = response.data;
      });
      
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAddButtonClick(): void {
    this.alert = true;
    let watchList = JSON.parse(window.localStorage.getItem('watchList'));
    let isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
    this.buttonLabel = isInWatchList ?  'Remove from Watchlist' : 'Add to Watchlist';
    this.alertMessage = isInWatchList ? 'Added to watchlist.' : 'Removed from watchlist.';
    this.alertClass = isInWatchList ? 'success' : 'danger';
    if(isInWatchList) {
        const index = watchList.findIndex(item => item.id === this.id);
        watchList.splice(index, 1);
    } else {
        watchList.splice(0, 0, {mediaType: this.mediaType, id: this.id});
    }
    window.localStorage.setItem('watchList', JSON.stringify(watchList));
  }

  onAlertClose(): void {
    this.alert = false;
    let watchList = JSON.parse(window.localStorage.getItem('watchList'));
    let isInWatchList = watchList.findIndex(item => item.id === this.id) !== -1;
    this.alertMessage = isInWatchList ? 'Added to watchlist.' : 'Removed from watchlist.';
    this.alertClass = isInWatchList ? 'success' : 'danger';
  }

  onCardClick(id): void {
    const modalRef = this.modalService.open(CastModalComponent, { centered: true, size: 'xl', scrollable: true });
    const avatar = this.casts.find(cast => cast.id === id);
    modalRef.componentInstance.id = id; //As prop
    modalRef.componentInstance.avatar = avatar.profile_path; //As prop
    modalRef.componentInstance.isDesktop = this.isDesktop;
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

  getReviewTime(unixTime): string {
    const result: string = `${this.unixTimeToYMD(unixTime)} ${this.unixTimeToTime(unixTime)}`
    return result
  }

  unixTimeToYMD = (unixTime) => {
    const date = new Date(unixTime);
    const dateStr = date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
    return dateStr;
  };
  
  unixTimeToTime = (unixTime) => {
    const date = new Date(unixTime);
    const dateStr = date.toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    });
    return dateStr;
  };

  
}
