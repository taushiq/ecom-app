import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productList = [];

  constructor(private adminService: AdminService, private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllProducts()
      .subscribe(data=>{
        this.productList = data.data;
      });
  }

}
