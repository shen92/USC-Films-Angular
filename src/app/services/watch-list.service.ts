import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WatchListService {
  private watchList: any[];

  constructor() { }

  getWatchList(): any[] {
    return this.watchList;
  }

  setWatchList(newWatchList): void {
    this.watchList = newWatchList;
  }
}
