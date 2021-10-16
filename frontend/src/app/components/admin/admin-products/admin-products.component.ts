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
  detailsMode = false;
  detailsIndex:string;
  editProductModel = {};
  editMode = false;
  editIndex: string;
  addProductModel = {};
  addMode = false;
  addIndex:string;

  constructor(private adminService: AdminService, private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllProducts()
      .subscribe(data=>{
        this.productList = data.data;
      });
  }

  detailsButtonClick(index: string){
    this.detailsMode = !this.detailsMode;
    this.editMode = false;
    this.addMode = false;
    this.detailsIndex = index;
  }

  edit(i:string){
    this.editMode = !this.editMode;
    this.editIndex = i;
    this.detailsMode = false;
    this.addMode = false;
    this.editProductModel = this.productList[i];
  }

  editFormSubmit(){
    
    this.adminService.editProduct(this.editProductModel)
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }else if(data && data.statusCode === "200"){
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Product Updated successfully!',
          });
          this.adminService.getAllProducts()
            .subscribe(data=>{
              this.productList = data.data;
            });
          this.editMode = false;
          this.addMode = false;
          this.detailsMode = false;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }
      });
  }


  deleteProduct(id:string){
    this.adminService.deleteProduct(id)
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }else if(data && data.statusCode === "200"){
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Product Deleted successfully!',
          });
          this.adminService.getAllProducts()
            .subscribe(data=>{
              this.productList = data.data;
            });
          this.editMode = false;
          this.detailsMode = false;
          this.addMode = false;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }
      });
  }


  addProduct(){
    this.addMode = !this.addMode;
    this.editMode = false;
    this.detailsMode = false;
  }

  addProductSubmit(){
    this.adminService.addProduct(this.addProductModel)
      .subscribe(data=>{
        if(data && data.statusCode === "500"){
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }else if(data && data.statusCode === "200"){
          Swal.fire({
            icon: 'success',
            title: 'Congrats!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Product Added Successfully!',
          });
          this.adminService.getAllProducts()
            .subscribe(data=>{
              this.productList = data.data;
            });
          this.editMode = false;
          this.detailsMode = false;
          this.addMode = false;
          this.addProductModel = {};
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops..!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          });
        }
      })
  }
  




}
