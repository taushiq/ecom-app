import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderData: any = [];

  constructor(private authService: AuthService,private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    if (!this.authService.isUserLoggedIn) {
      this.router.navigate(['/login']);
    }

    this.orderService.getMyOrders()
      .subscribe(data=>{
        this.orderData = data.data;
        console.log(data.data);
      });
    
  }

  cancelOrder(orderId, productId, quantity){
    this.orderService.cancelOrder(orderId, productId, quantity)
      .subscribe(data=>{
        this.orderService.getMyOrders()
          .subscribe(data=>{
            this.orderData = data.data;
            console.log(data.data);
      });
      });
  }


  selectProduct(id: number){
    this.router.navigate(['/product', id]);
  }



}
