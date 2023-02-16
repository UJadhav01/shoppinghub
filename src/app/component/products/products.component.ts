import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList:any;
  public searchProduct:string='';
  public filterCategory:any;
  constructor(private _http:ApiService,private cartService:CartService) {

   }

  ngOnInit(): void {

    this._http.getProduct().subscribe((arg:any) =>{
       this.productList = arg;
       this.filterCategory=arg;
      //  console.log(arg);
      this.productList.forEach((element:any) => {
        if(element.category==="women's clothing" || element.category==="kid's clothing"){
          element.category="fashion";
        }
        Object.assign(element,{quantity:2,total:element.price})
      });
      }
       );
this.cartService.search.subscribe((value:any)=>{
  this.searchProduct=value;
})
  }
addItemToCart(item:any){
this.cartService.addToCart(item);
}
filter(category:string){
  this.filterCategory=this.productList
  .filter((a:any)=>{
    if(a.category== category || category == ''){
      return a;
    }
  })
}

}
