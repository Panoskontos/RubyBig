import { TheatreService } from './../theatre.service';
import { Component } from '@angular/core';
import { Theatre } from '../theatre';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent{
  theatres: Theatre[] = [];
  role!: string;

  constructor(
    public theatreService: TheatreService,
    private route: ActivatedRoute,
    ){}
  ngOnInit(): void {
      // for role
      var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyrole=([^;]+)'));
      if(cookieValueR){
        console.log(cookieValueR[2]);
        this.role = cookieValueR[2];
      }
    this.theatreService.getAll().subscribe((data: Theatre[])=>{
      this.theatres = data;
      console.log(this.theatres)
    })
  }

}
