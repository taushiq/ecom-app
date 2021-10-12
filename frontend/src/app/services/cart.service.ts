import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CartModelServer } from '../models/cart.model';
import { Subject } from 'rxjs';
import { ProductModelServer } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  customerCartArray =  [];
  customerCart: CartModelServer[] = [];
  cartSubscription = new Subject<CartModelServer[]>();

  constructor(private http: HttpClient, private router: Router) { }

  updateCart(productId:number, product:ProductModelServer, operation:string){
      switch(operation){
        case 'add':
          if(this.customerCartArray.includes(productId)){
            console.log("ProductFound");
            for (let i = 0; i < this.customerCart.length; i++) {
              if(this.customerCart[i].productId == productId){
                this.customerCart[i].numInCart += 1 ; 
                this.customerCart[i].product.productSubTotal = this.customerCart[i].numInCart * this.customerCart[i].product.price;
                break;
              }
            }
            // console.log("After Update in Service IF " , this.printArray());
            

          }else{
            this.customerCartArray.push(productId);
            product.productSubTotal = product.price;
            this.customerCart.push({
              productId : productId,
              product: product,
              numInCart: 1
            })
            // console.log("After Update in Service Else " , this.printArray());
          }
          break;
        case 'delete':
          if(this.customerCartArray.includes(productId)){
            console.log("ProductFound");
            for (let i = 0; i < this.customerCart.length; i++) {
              if(this.customerCart[i].productId == productId){
                if(this.customerCart[i].numInCart > 1){
                  this.customerCart[i].numInCart -= 1 ; 
                  this.customerCart[i].product.productSubTotal = this.customerCart[i].numInCart * this.customerCart[i].product.price;
                  break;
                }else{
                  if (i > -1) {
                    this.customerCartArray.splice(i, 1);
                    this.customerCart.splice(i, 1);
                  }

                  console.log("Cart after splicing", this.customerCart);
                   
                }
              }
            }  
          }
          break;
        default:
          break;
      }
      this.cartSubscription.next(this.customerCart.slice());
  }

  deleteFromCart(product:ProductModelServer){
    const i = this.customerCartArray.indexOf(product.id);
    if (i > -1) {
      this.customerCartArray.splice(i, 1);
      this.customerCart.splice(i, 1);
    }
    this.cartSubscription.next(this.customerCart.slice());
  }

  getCustomerCart(){
    return this.customerCart.slice();
  }

  printArray(){
    for(let i = 0; i < this.customerCartArray.length; i++){
      console.log("Customer CartArray " , this.customerCartArray[i]);
    }
    for(let i = 0; i < this.customerCart.length; i++){
      console.log("Customer Cart " , this.customerCart[i]);
    }
    
  }

  

}
