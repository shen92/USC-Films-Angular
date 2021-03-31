import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap} from '@angular/router';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DetailsPageService } from 'src/app/services';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
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

  public alert = false;
  public alertClass = 'success';

  public reviewerPlaceHolder = 'src/assets/img/reviewer-placeholder.jpg'

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private detailsPageService: DetailsPageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = screen.width;
    this.screenHeight = screen.height;
    this.videoWidth = this.screenWidth < 576 ? this.screenWidth * 0.85 : this.screenWidth * 0.5;
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
      })
      this.detailsPageService.fetchSimilarMedia(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.similars = response.data;
      })
      this.detailsPageService.fetchMediaVideo(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const video = response.data[0];
        this.key = video.key;
      })
      this.detailsPageService.fetchMediaDetails(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const details = response.data;
        this.title = details.title;
        this.tagline = details.tagline;
        this.year = mediaType === 'movie' ? details.release_date : details.first_air_date;
        this.vote_average = details.vote_average;
        this.duration = mediaType === 'movie' ? details.runtime : details.episode_run_time;
        this.genres = details.genres;
        this.spokenLanguages = details.spoken_languages;
        this.description = details.overview;
      })
      this.detailsPageService.fetchMediaCasts(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.casts = response.data;
      })
      this.detailsPageService.fetchMediaReviews(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        this.reviews = response.data;
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onResize(e):void {
    this.screenWidth = e.target.innerWidth;
    this.screenHeight = e.target.innerHeight;
    this.videoWidth = this.screenWidth < 576 ? this.screenWidth * 0.85 : this.screenWidth * 0.5;
    this.videoHeight = this.screenWidth < 576 ? this.screenHeight * 0.3 : this.screenHeight * 0.5;
  }

  onButtonClick(): void {
    this.alert = true
  }

  onAlertClose(): void {
    this.alert = false;
  }

  getDuration():string {
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
    return this.genres.map(genre => genre.name).join(',')
  }
  
  getSpokenLanguages(): string{
    return this.spokenLanguages.map(language => language.name).join(',')
  }
}
