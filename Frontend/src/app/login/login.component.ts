import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
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
    const data = { user: { email: this.form.getRawValue().email, password:  this.form.getRawValue().password } };
    this.http.post('http://localhost:3000/login', data, { headers, responseType: 'json'  }).subscribe(res =>{
      let x:any = res
      console.log(x.token)
      document.cookie = x.token
      this.router.navigate(['/'])

     }

    )

  

  }

}
