import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket.service';
@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent {
  id!: number;
  post!: any;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: TicketService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
     
  ngOnInit(): void {
    this.id = this.route.snapshot.params['ticketId'];
    this.postService.find(this.id).subscribe((data: any)=>{
      this.post = data;
      console.log(data)
    });
  }
}
