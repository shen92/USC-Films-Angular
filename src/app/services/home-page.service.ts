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
    return this.http.get(`${BASE_URL}/movies/currently-playing`).pipe(retry(3), catchError(this.handleError));
  }
 
  fetchPopularMovies() {
    return this.http.get(`${BASE_URL}/movies/popular`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTopRatedMovies() {
    return this.http.get(`${BASE_URL}/movies/top-rated`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTrendingMovies() {
    return this.http.get(`${BASE_URL}/movies/trending`).pipe(retry(3), catchError(this.handleError));
  }

  fetchPopularTVShows() {
    return this.http.get(`${BASE_URL}/tvs/popular`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTopRatedTVShows() {
    return this.http.get(`${BASE_URL}/tvs/top-rated`).pipe(retry(3), catchError(this.handleError));
  }

  fetchTrendingTVShows() {
    return this.http.get(`${BASE_URL}/tvs/trending`).pipe(retry(3), catchError(this.handleError));
  }
}
