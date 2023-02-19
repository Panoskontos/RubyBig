import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-ticket-index',
  templateUrl: './ticket-index.component.html',
  styleUrls: ['./ticket-index.component.css']
})
export class TicketIndexComponent {
  tickets: Ticket[] = [];
  id!: number;
  role!:string;

  constructor(
    public ticketService: TicketService,
    private route: ActivatedRoute,

    ){}
  ngOnInit(): void {
       // for role
       var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyrole=([^;]+)'));
       if(cookieValueR){
         console.log(cookieValueR[2]);
         this.role = cookieValueR[2];
       }
    this.id = this.route.snapshot.params['eventId'];
    console.log(this.id)
    const post_data = {
        "event_id": this.id
    };
    this.ticketService.getAllTickets(post_data).subscribe((data: Ticket[])=>{
      this.tickets = data;
      console.log(this.tickets)
    })
  }

}
