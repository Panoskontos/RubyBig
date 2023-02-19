import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    ){

  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    }
    )
  }

  submit(): void {
    console.log(this.form.getRawValue())
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = { user: { email: this.form.getRawValue().email, password: this.form.getRawValue().password } };
    this.http.post('http://localhost:3000/users', data, { headers }).subscribe(res => console.log(res));
    this.router.navigate(['/login'])
  }

}
