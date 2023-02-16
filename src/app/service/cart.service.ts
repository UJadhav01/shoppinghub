import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList:any=[];
  public productList=new BehaviorSubject<any>([]);
  public search=new BehaviorSubject<string>("");
  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProducts(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any){
this.cartItemList.push(product);
this.productList.next(this.cartItemList);
this.getTotalPrice();
// console.log(this.cartItemList);
  }
  getTotalPrice():number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.quantity*a.total;
    })
    return grandTotal;
  }

  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.id==a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCartItems(){
    this.cartItemList=[];
    this.productList.next(this.cartItemList);
  }
}
