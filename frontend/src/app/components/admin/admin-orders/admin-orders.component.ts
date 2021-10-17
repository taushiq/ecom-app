import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders = [];
  detailsMode = false;
  detailsIndex:string;
  deliveryDate:string;
  index:string
  editMode = false;
  monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

  constructor(private adminService: AdminService, private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllOrders()
      .subscribe(data=>{
        this.orders = data.data;
      })
  }

  detailsClicked(i:string){
    this.detailsMode = !this.detailsMode;
    this.detailsIndex = i;
  }

  outForDelivery(){
    this.adminService.outForDelivery(this.orders[this.detailsIndex])
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })

        }else if(data && data.statusCode === "200") {
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Notification Sent!',
          })
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })
        }
      });
  }

  updateDeliveryDateButtonClicked(i:string){
    this.editMode = !this.editMode;
    this.index = i;
  }


  formSubmit(){

    const newDate = new Date(this.deliveryDate);
    const formattedDate = newDate.getDate() + ' ' + this.monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear();

    this.adminService.updateDeliveryDate(formattedDate,this.orders[this.detailsIndex].id, this.orders[this.detailsIndex].productName, this.orders[this.detailsIndex].email )
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })

        }else if(data && data.statusCode === "200") {
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Delivery Date Updated!',
          })
          this.adminService.getAllOrders()
            .subscribe(data=>{
              this.orders = data.data;
            });
          this.editMode = false;
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })
        }
      });

  }


  markAsDelivered(){
    this.adminService.markAsDelivered(this.orders[this.detailsIndex].id, this.orders[this.detailsIndex].productName, this.orders[this.detailsIndex].email)
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })

        }else if(data && data.statusCode === "200") {
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Order marked as Delivered!',
          })
          this.adminService.getAllOrders()
            .subscribe(data=>{
              this.orders = data.data;
            });
          this.editMode = false;
          
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })
        }
      });
  }



}
