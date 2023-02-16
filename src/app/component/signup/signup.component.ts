import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private fb:FormBuilder,
    private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      fullName:[''],
      mobileNumber:[''],
      email:[''],
      password:['']
    })
  }
  signUp(){
this.http.post<any>("http://localhost:3000/signUpUsers",this.signupForm.value)
.subscribe((res)=>{
  alert("Signup successfully...");
  this.signupForm.reset();
  this.router.navigate(['login'])
},err=>{
  alert("Something went wrong...")
})
  }

}
