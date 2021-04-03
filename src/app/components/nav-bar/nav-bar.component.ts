import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, OperatorFunction, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { SearchService } from 'src/app/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  public navbarCollapse: boolean = true;
  public model: any;
  public searching: boolean = false;
  public searchFailed: boolean = false;
  @Input() activatedRoute: string;
  @Input() isDesktop: boolean;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { 
  }

  inputFormatter = (x: { name: string }) => x.name;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.searchService.fetchSearchresults(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }),
        ),
      ),
      map(res => res['data']),
      tap(() => this.searching = false)
    )

    onResultClick(id, mediaType): void {
      this.router.navigate( ['watch', mediaType, id]);
    }

  



}
