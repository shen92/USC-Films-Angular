import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-watch-list-page',
  templateUrl: './watch-list-page.component.html',
  styleUrls: ['./watch-list-page.component.css']
})
export class WatchListPageComponent implements OnInit {
  public isDesktop: boolean;
  public activatedRoute: string = "mylist";
  public watchList: any[];
  
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      this.isDesktop = result.matches;
    });
    const watchList = JSON.parse(window.localStorage.getItem('watchList'));
    this.watchList = watchList;
  }

}
