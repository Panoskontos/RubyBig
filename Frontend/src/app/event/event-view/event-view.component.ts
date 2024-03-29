import { Component } from '@angular/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent {

  role!: String;

  ngOnInit(){
    // for role
    var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyrole=([^;]+)'));
    if(cookieValueR){
      console.log(cookieValueR[2]);
      this.role = cookieValueR[2];
    }
  }

}
