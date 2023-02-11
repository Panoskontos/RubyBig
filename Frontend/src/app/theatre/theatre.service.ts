import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Theatre } from './theatre';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  private apiURL = "http://127.0.0.1:3000/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Theatre[]> {
    var cookieValue = document.cookie.match(new RegExp('(^| )myrubycookie=([^;]+)'));
    let myrubycookie = ""
    if (cookieValue) {
        console.log(cookieValue[2]);
        myrubycookie = "Bearer "+cookieValue[2]
    }
    return this.httpClient.get<Theatre[]>(this.apiURL + 'theatres/', {
      headers:new HttpHeaders().set('Authorization', `${myrubycookie}`)})
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

}
