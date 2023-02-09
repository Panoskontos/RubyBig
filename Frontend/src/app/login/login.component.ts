import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService
    ){
  }
  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email:'',
      password:''
    }
    )
    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user.email)
      this.loggedIn = (user != null);
      
      // regitser user
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const data = { user: { 
        email: user.email, 
        password: "rails66"
       } };
      this.http.post('http://localhost:3000/users', data, { headers }).subscribe(res =>{
        console.log(res)
      }
       );
       this.http.post('http://localhost:3000/login', data, { headers, responseType: 'json'  }).subscribe(res =>{
        let x:any = res
        console.log(x)
        document.cookie = "myrubycookie="+ x.token
        // Emitters.userEmitter.emit(x.user);
        this.router.navigate(['/'])
       })
    });
    
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  

  submit(): void {
    console.log(this.form.getRawValue())
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const data = { user: { email: this.form.getRawValue().email, password:  this.form.getRawValue().password } };
    this.http.post('http://localhost:3000/login', data, { headers, responseType: 'json'  }).subscribe(res =>{
      let x:any = res
      console.log(x)
      document.cookie = "myrubycookie="+ x.token
      // Emitters.userEmitter.emit(x.user);
      this.router.navigate(['/'])
     }, err=>{
      console.log(err)
    }

    )

  

  }

}
