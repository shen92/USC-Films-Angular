import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class CurrentlyPlayingMoviesService {

  constructor(private http: HttpClient) { }

  fetchCurrentPlayingMovies() {
    return this.http.get(`${BASE_URL}/currently-playing-movies`)
  }
}
