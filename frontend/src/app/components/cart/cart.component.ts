import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartModelServer } from 'src/app/models/cart.model';
import { ProductModelServer } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  customerComponentCart = [];
  emptyCart: boolean = true;
  cartLength: number = 0;
  subTotal = 0;
  cartSubscription: Subscription;
  constructor(private authService: AuthService ,private service: CartService,private router: Router) { }

  ngOnInit(): void {

    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.customerComponentCart = this.service.getCustomerCart();
    if(this.customerComponentCart.length > 0){
      this.emptyCart = false;
      this.cartLength = this.customerComponentCart.length;
      this.calculateTotal();
    }else{
      this.emptyCart = true;
      this.cartLength = 0;
    }
    this.cartSubscription = this.service.cartSubscription
    .subscribe(
      (cart: CartModelServer[]) => {
        this.customerComponentCart = cart;
        if(this.customerComponentCart.length > 0){
          this.emptyCart = false;
          this.cartLength = this.customerComponentCart.length;
          this.calculateTotal();
        }else{
          this.emptyCart = true;
          this.cartLength = 0;
        }
      }
    );
  }

  calculateTotal(){
    var sum = 0;
    for(let i = 0; i < this.customerComponentCart.length ; i++){
      sum = sum + this.customerComponentCart[i].product.price * this.customerComponentCart[i].numInCart;
    }
    this.subTotal = sum;
  }

  updateCart(product: ProductModelServer, operation){
    // console.log('Update Product Cart from Home Component ', product, operation);
    this.service.updateCart(product.id, product, operation);
  }

  selectProduct(id: number){
    this.router.navigate(['/product', id]);
  }
  

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
