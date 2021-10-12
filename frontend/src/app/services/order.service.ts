import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private cartService: CartService) { }

  placeOrder(orderModel: Object): Observable<any>{

    var orderObject = { orderModel: orderModel, cart: this.cartService.customerCart , email: this.authService.email}

      const options = {
            headers: {
              'authorization': 'Bearer ' + this.authService.token
            }
          };
      return this.http.post(this.SERVER_URL + '/orders/new', orderObject, options);
    }

  cancelOrder(orderId, productId, quantity){
    const options = {
      headers: {
        'authorization': 'Bearer ' + this.authService.token
      }
    };
  return this.http.get(this.SERVER_URL + '/myorders/cancel?orderId=' + orderId + '&productId=' + productId + '&userId=' +  this.authService.userId + '&quantity=' + quantity + '&email='+this.authService.email , options);
  }

  getMyOrders():Observable<any>{
    const options = {
      headers: {
        'authorization': 'Bearer ' + this.authService.token
      }
    };
  return this.http.get(this.SERVER_URL + '/myorders?userId=' + this.authService.userId, options);
  }

    
  


}
