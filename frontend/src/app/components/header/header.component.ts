import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartModelServer } from 'src/app/models/cart.model';
import { ProductModelServer } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  customerComponentCart = [];
  emptyCart: boolean = true;
  cartLength: number = 0;
  subTotal = 0;
  cartSubscription: Subscription;
  constructor(public authService: AuthService, private service: CartService,private router: Router) { }

  ngOnInit(): void {
    this.customerComponentCart = this.service.getCustomerCart();
    this.cartSubscription = this.service.cartSubscription
    .subscribe(
      (cart: CartModelServer[]) => {
        this.customerComponentCart = cart;
        if(this.customerComponentCart.length > 0){
          this.emptyCart = false;
          
        }else{
          this.emptyCart = true;
        }
        this.cartLength = this.customerComponentCart.length;
        this.calculateTotal();
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

  selectProduct(id: number){
    this.router.navigate(['/product', id]);
  }

  deleteFromCart(product:ProductModelServer){
    this.service.deleteFromCart(product);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
