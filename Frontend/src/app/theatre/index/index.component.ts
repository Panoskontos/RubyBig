import { TheatreService } from './../theatre.service';
import { Component } from '@angular/core';
import { Theatre } from '../theatre';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent{
  theatres: Theatre[] = [];
  constructor(public theatreService: TheatreService){}
  ngOnInit(): void {
    this.theatreService.getAll().subscribe((data: Theatre[])=>{
      this.theatres = data;
      console.log(this.theatres)
    })
  }

}
