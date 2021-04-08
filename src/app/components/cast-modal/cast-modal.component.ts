import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CastModalService } from 'src/app/services';

@Component({
  selector: 'app-cast-modal',
  templateUrl: './cast-modal.component.html',
  styleUrls: ['./cast-modal.component.css']
})
export class CastModalComponent implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() avatar: string;
  @Input() isDesktop: boolean;
  
  public name: string;
  public birthday: string;
  public placeOfBirth: string;
  public gender: number;
  public knownForDepartment: string;
  public alsoKnownAs: any[];
  public biography: string;

  public imdbId: string;
  public facebookId: string;
  public instagramId: string;
  public twitterId: string;

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(public activeModal: NgbActiveModal, private castModalService: CastModalService) {}
  
  ngOnInit(): void {
    this.castModalService.fetchCastDetails(this.id).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      const details = response.data;
      this.name = details.name;
      this.birthday = details.birthday;
      this.placeOfBirth = details.place_of_birth;
      this.gender = details.gender;
      this.knownForDepartment = details.known_for_department;
      this.alsoKnownAs = details.also_known_as;
      this.biography = details.biography;
    });
    this.castModalService.fetchCastExternalIds(this.id).pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      const externalIds = response.data;
      this.imdbId = externalIds.imdb_id;
      this.facebookId = externalIds.facebook_id;
      this.instagramId = externalIds.instagram_id;
      this.twitterId = externalIds.twitter_id;
      
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getGender(): string {
    const genders = ['Undefined', 'Female', 'Male']
    return genders[this.gender];
  }

  getAlsoKnownAs(): string {
    if(this.alsoKnownAs == null || this.alsoKnownAs.length === 0) return ""
    return this.alsoKnownAs.join(',')
  }

}
