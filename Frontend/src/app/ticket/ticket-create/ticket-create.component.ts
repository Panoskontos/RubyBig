import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TicketService } from '../ticket.service';   


@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
     
  form!: FormGroup;
  id!: number;

     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,

  ) { 
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['eventId'];



    this.form = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      // ntickets: new FormControl('')
      
    });
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value.email);
    const payload = {
      "event_id": this.id,
      "fname":  this.form.value.fname,
      "lname":  this.form.value.lname,
      "email": this.form.value.email
    }

    // for (let i = 0; i < this.form.value.ntickets; i++) {
      console.log(payload)
      this.ticketService.create(payload).subscribe((res:any) => {
           console.log(res)
           console.log('Ticket created successfully!');
           this.router.navigateByUrl('');
          })
        }

  // }
}
