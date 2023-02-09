import { Emitters } from './../emitters/emitters';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  authenticate = false;
  constructor(){}
  ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        auth => {
          this.authenticate=auth;
        }
      )
  }
}
