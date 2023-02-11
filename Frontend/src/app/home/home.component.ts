import { Emitters } from './../emitters/emitters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  message = '';
  userData = {}

  constructor( private http: HttpClient){
   
  }
  ngOnInit(): void {
    var cookieValue = document.cookie.match(new RegExp('(^| )myrubycookie=([^;]+)'));
    let myrubycookie = ""
if (cookieValue) {
    console.log(cookieValue[2]);
    myrubycookie = "Bearer "+cookieValue[2]
}
    this.http.get('http://127.0.0.1:3000/theatres', {
    headers:new HttpHeaders().set('Authorization', `${myrubycookie}`)}).subscribe(
      res=>{
        console.log(res)
        this.message = `You are logged in`;
        Emitters.authEmitter.emit(true);
      }, err=>{
        this.message = `PLease login`;
        Emitters.authEmitter.emit(false);
        console.log(err)
      }
    )
      
  }
}
