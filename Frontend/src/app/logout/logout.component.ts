import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(
      private router: Router,
    ){
 
    }
    ngOnInit(): void {
      console.log(document.cookie)
      document.cookie="non"
      console.log("deleted cookies")
      this.router.navigate(['/'])

    }
}
