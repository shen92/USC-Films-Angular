import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { BASE_URL } from './config'

@Injectable({
  providedIn: 'root'
})
export class CastModalService {

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

  fetchCastDetails(id) {
    return this.http.get(`${BASE_URL}/api/v1/cast/${id}/details`).pipe(retry(3), catchError(this.handleError));
  }

  fetchCastExternalIds(id) {
    return this.http.get(`${BASE_URL}/api/v1/cast/${id}/external-ids`).pipe(retry(3), catchError(this.handleError));
  }
}
