import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watch-list-page',
  templateUrl: './watch-list-page.component.html',
  styleUrls: ['./watch-list-page.component.css']
})
export class WatchListPageComponent implements OnInit {
  public isDesktop: boolean;
  public activatedRoute: string = "mylist";
  public watchList: any[];
  public isEmpty: boolean;

  public groups: any[] = [];
  public elements: number = 6;
  
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.WebLandscape
    ]).subscribe(result => {
      this.isDesktop = result.matches;
    });
    let watchList = JSON.parse(window.localStorage.getItem('watchList'));
    if(watchList == null) {
      window.localStorage.setItem('watchList', JSON.stringify([]));
      watchList = []
    }
    this.watchList = watchList;
    this.isEmpty = this.watchList.length === 0;
    this.groupElements();
  } 

  groupElements(): void {
    if(this.watchList == null || this.watchList.length === 0)
      return;
    let result = [];
    for (let i = 0; i < this.watchList.length; i += this.elements){
      result.push(this.watchList.slice(i, i + this.elements));
    }
    if(result[result.length - 1].length !== this.elements){
      const diff = this.elements - result[result.length - 1].length;
      for(let i = 0; i < diff; i++){
        result[result.length - 1].push({placeholder: true})
      }
    }
    this.groups = result;
  }

  onClick(id: number, mediaType: string): void {
    this.router.navigate( ['watch', mediaType, id]);
  }
}
