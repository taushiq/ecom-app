import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartModelServer } from 'src/app/models/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  customerComponentCart = [];
  emptyCart: boolean = true;
  cartLength: number = 0;
  subTotal = 0;
  cartSubscription: Subscription;
  orderModel: any = {};
  constructor(private authService: AuthService, private service: CartService, private orderService: OrderService, private router: Router) { }

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
          this.calculateTotal();
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

  formSubmit(){
    console.log("Submitted Form - ", this.orderModel);
    this.orderModel.userId = this.authService.userId;
    this.orderService.placeOrder(this.orderModel)
      .subscribe(data=>{
        if(data.message == "success"){
          this.service.customerCart = [];
          this.service.customerCartArray = [];
          this.service.cartSubscription.next(this.service.customerCart.slice());
          this.router.navigate(['/thankyou']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'GOT IT',
            text: 'Please try again!',
          }).then(data => {
            if(data){
              
            }
          })
        }
        
        
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: '#D10024',
          confirmButtonText: 'GOT IT',
          text: 'Please try again!',
        }).then(data => {
          if(data){
            
          }
        })
      });
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
  }

}
