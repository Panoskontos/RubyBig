import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiURL = "http://127.0.0.1:3000/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
    
  getAllTickets(data:any): Observable<Ticket[]> {
    var cookieValue = document.cookie.match(new RegExp('(^| )myrubycookie=([^;]+)'));
    let myrubycookie = ""
    if (cookieValue) {
        console.log(cookieValue[2]);
        myrubycookie = "Bearer "+cookieValue[2]
    }
    return this.httpClient.post<Ticket[]>(this.apiURL + 'get_tickets_for_event',data, {
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
