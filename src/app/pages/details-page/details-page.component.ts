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
  public recommendationsTitle = "";
  public similarsTitle = "";
  public title = "";

  public recommendations = [];
  public similars = [];
  public video = {};

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private detailsPageService: DetailsPageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
        this.video = response.data;
      })
      this.detailsPageService.fetchMediaDetails(this.id, this.mediaType).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
        const details = response.data;
        this.title = details.title;
      })
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
