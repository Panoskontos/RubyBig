import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Event } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiURL = "http://127.0.0.1:3000/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
    
  getAllEvents(data:any): Observable<Event[]> {
    var cookieValue = document.cookie.match(new RegExp('(^| )myrubycookie=([^;]+)'));
    let myrubycookie = ""
    if (cookieValue) {
        console.log(cookieValue[2]);
        myrubycookie = "Bearer "+cookieValue[2]
    }
    return this.httpClient.post<Event[]>(this.apiURL + 'get_events_for_theatre',data, {
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
