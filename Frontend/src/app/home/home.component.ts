import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  message = 'You are not logged in'
  constructor( private http: HttpClient){
   
  }
  ngOnInit(): void {
    const cookieValue = "Bearer "+ document.cookie
    console.log(cookieValue)
    this.http.get('http://127.0.0.1:3000/posts', {
    headers:new HttpHeaders().set('Authorization', `${cookieValue}`)}).subscribe(
      res=>{
        console.log(res)
        this.message = '';
      }, err=>{console.log(err)}
    )
      
  }
}
