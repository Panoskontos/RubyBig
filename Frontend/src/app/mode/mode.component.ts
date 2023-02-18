import { Component } from '@angular/core';

@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent {
  role!: String;
  showMode!: boolean;

  ngOnInit(){
    // for role
    var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyrole=([^;]+)'));
    if(cookieValueR){
      console.log(cookieValueR[2]);
      this.role = cookieValueR[2];
      this.role = this.role.toUpperCase()
      if(this.role!=="NONE"){
        this.showMode = true
      } else {
        this.showMode = false
      }
    } 
  }
}
