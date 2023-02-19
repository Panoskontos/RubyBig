import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TheatreService } from '../theatre.service';

@Component({
  selector: 'app-create-theatre',
  templateUrl: './create-theatre.component.html',
  styleUrls: ['./create-theatre.component.css']
})

export class CreateTheatreComponent {
    
  form!: FormGroup;
  id!: number;
  email!: string;

  constructor(
    public eventService: TheatreService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
     
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      seats: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }
     

  get f(){
    return this.form.controls;
  }
     

  submit(){
    console.log(this.form.value);
    this.eventService.create(this.form.value).subscribe((res:any) => {
         console.log(res)
         this.router.navigateByUrl('');
    })
  }
}
