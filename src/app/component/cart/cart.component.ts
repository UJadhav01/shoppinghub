import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products:any=[];
  public grandTotal !:number;
  constructor(private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res:any)=>{
      this.products=res;
      this.grandTotal=this.cartService.getTotalPrice();
    })
  }
  removeItem(item:any){
this.cartService.removeCartItem(item);
  }
  removeAllCartItems(){
    this.cartService.removeAllCartItems();
  }
  onCheckOut(){
this.router.navigate(['checkout']);
  }
}
