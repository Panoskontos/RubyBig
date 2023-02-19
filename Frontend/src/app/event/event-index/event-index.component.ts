import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-index',
  templateUrl: './event-index.component.html',
  styleUrls: ['./event-index.component.css']
})
export class EventIndexComponent {
  events: Event[] = [];
  past_events: Event[] = [];
  upcoming_events: Event[] = [];
  id!: number;
  today!: any;
  role!: string;
  email!: string


  constructor(
    public eventService: EventService,
    private route: ActivatedRoute,

    ){}
  ngOnInit(): void {
    // for role
        var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyrole=([^;]+)'));
        if(cookieValueR){
          console.log(cookieValueR[2]);
          this.role = cookieValueR[2];
        }
        var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyemail=([^;]+)'));
        if(cookieValueR){
          console.log(cookieValueR[2]);
          this.email = cookieValueR[2];
        }

    this.today = new Date();
    this.today = this.today.toISOString()
    console.log(this.today);
    this.id = this.route.snapshot.params['theatreId'];
    console.log(this.id)
    const post_data = {
        "theatre_id": this.id
    };
    this.eventService.getAllEvents(post_data).subscribe((data: Event[])=>{
      this.events = data;
      console.log(this.events)
      this.past_events = this.events.filter(ev => {
        return (ev.date < this.today && ev.email === this.email)
      })
      console.log(this.past_events)
      this.upcoming_events = this.events.filter(ev => {
        return ev.date >= this.today
      })
    })
  }

}
