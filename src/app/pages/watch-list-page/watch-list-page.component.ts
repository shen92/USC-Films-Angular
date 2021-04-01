import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch-list-page',
  templateUrl: './watch-list-page.component.html',
  styleUrls: ['./watch-list-page.component.css']
})
export class WatchListPageComponent implements OnInit {
  public activatedRoute: string = "mylist";
  public watchList: any[];
  
  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(window.localStorage.getItem('watchList')));
  }

}
