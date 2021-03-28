import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class DetailsPageService {

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

  fetchRecommendedMedia(id, mediaType) {
    return this.http.get(`${BASE_URL}/${mediaType}/${id}/recommended`).pipe(retry(3), catchError(this.handleError));
  }
  
  fetchSimilarMedia(id, mediaType) {
    return this.http.get(`${BASE_URL}/${mediaType}/${id}/similar`).pipe(retry(3), catchError(this.handleError));
  }

  fetchMediaVideo(id, mediaType) {
    return this.http.get(`${BASE_URL}/${mediaType}/${id}/video`).pipe(retry(3), catchError(this.handleError));
  }

  fetchMediaDetails(id, mediaType) {
    return this.http.get(`${BASE_URL}/${mediaType}/${id}/details`).pipe(retry(3), catchError(this.handleError));
  }

  fetchMediaReviews() {

  }

  fetchMediaCast() {

  }
}
