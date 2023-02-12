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
  id!: number;

  constructor(
    public eventService: EventService,
    private route: ActivatedRoute,

    ){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['theatreId'];
    console.log(this.id)
    const post_data = {
        "theatre_id": this.id
    };
    this.eventService.getAllEvents(post_data).subscribe((data: Event[])=>{
      this.events = data;
      console.log(this.events)
    })
  }

}
