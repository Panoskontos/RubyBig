import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
     
  form!: FormGroup;
  id!: number;
  email!: string;

  constructor(
    public eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
     
  ngOnInit(): void {
    this.id = this.route.snapshot.params['theatreId'];
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }
     

  get f(){
    return this.form.controls;
  }
     

  submit(){
    var cookieValueR = document.cookie.match(new RegExp('(^| )myrubyemail=([^;]+)'));
    if(cookieValueR){
      console.log(cookieValueR[2]);
      this.email = cookieValueR[2];
    }
    this.form.value['email']= this.email
    this.form.value['theatre_id']= this.id
    console.log(this.form.value);
    this.eventService.create(this.form.value).subscribe((res:any) => {
         console.log(res)
         this.router.navigateByUrl('theatre/'+this.id+'/view');
    })
  }
}
