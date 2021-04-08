import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  fetchCurrentPlayingMovies() {
    return this.http.get(`${BASE_URL}/api/v1/movies/currently-playing`).pipe(retry(3), catchError(this.handleError));
  }
 
  fetchPopularMovies() {
    return this.http.get(`${BASE_URL}/api/v1/movies/popular`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTopRatedMovies() {
    return this.http.get(`${BASE_URL}/api/v1/movies/top-rated`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTrendingMovies() {
    return this.http.get(`${BASE_URL}/api/v1/movies/trending`).pipe(retry(3), catchError(this.handleError));
  }

  fetchPopularTVShows() {
    return this.http.get(`${BASE_URL}/api/v1/tvs/popular`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTopRatedTVShows() {
    return this.http.get(`${BASE_URL}/api/v1/tvs/top-rated`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTrendingTVShows() {
    return this.http.get(`${BASE_URL}/api/v1/tvs/trending`).pipe(retry(3), catchError(this.handleError));
  }

  fetchWatchListItems() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new URLSearchParams();
    return this.http.get(`${BASE_URL}/api/v1/tvs/trending`).pipe(retry(3), catchError(this.handleError));
  }
 }
