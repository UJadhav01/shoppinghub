import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public totalItems:number=0;
 public searchTerm:string='';
 loginForm !: FormGroup;
public isLogin:boolean=false;
  constructor(private cartService:CartService,
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res:any)=>{
this.totalItems=res.length;

    });

    this.loginForm=this.fb.group({
      email:[''],
      password:['']
    })
  }
  searchProduct(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    //console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }



  login(){
this.http.get<any>("http://localhost:3000/signUpUsers")
.subscribe(res=>{
  const userList=res.find((a:any)=>{
    return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
  });
  if(userList){
    alert("Login Success");
    this.loginForm.reset();
    this.router.navigate(['products']);
    const ref=document.getElementById('closeDialogonLogin');
    ref?.click();
    this.isLogin=true;

  }else{
    alert("User not found , please enter valid email and password")
  }
},err=>{
  alert("Something went wrong...")
})
  }

  logOut(){
this.router.navigate(['home']);
this.isLogin=false;
  }
}

