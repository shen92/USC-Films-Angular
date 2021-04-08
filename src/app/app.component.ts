import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { 
  
  //Run commented code to flush cache.
  ngOnInit():void {
    //window.localStorage.setItem('watchList', JSON.stringify([]));
    window.localStorage.setItem('history', JSON.stringify([]));
  }

  ngOnDestroy(): void {
    //window.localStorage.clear();
  }

}
