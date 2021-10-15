import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories = [];
  categoryName:string;
  editMode:boolean = false;
  index:string;
  newCategory:any = {};
  addCategoryMode:boolean = false;

  constructor(private adminService: AdminService, private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe( data => {
      this.categories = data.categories;
      
  })}

  edit(i: string ){
      this.index = i;
      this.editMode = !this.editMode;
      this.categoryName = null;    
  }

  delete(id: string){
    console.log(id);
    Swal.fire({
      icon: 'info',
      title: 'Are you Sure?',
      showCancelButton: true,
      cancelButtonColor: '#ff6600',
      confirmButtonColor: '#D10024',
      confirmButtonText: 'Delete',
      text: 'This would delete all the products of this category also!',
    }).then(data => {
      
      if(data.isConfirmed){
        this.adminService.deleteCategory(id)
          .subscribe(data=>{
            console.log(data);
            if(data.statusCode === "203"){
              Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                confirmButtonColor: '#D10024',
                confirmButtonText: 'Got It',
                text: 'Cannot Delete! There are pending orders for this category!',
              })

            }else if(data.statusCode === "500"){
              Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                confirmButtonColor: '#D10024',
                confirmButtonText: 'Got It',
                text: 'Please try again!',
              })

            }else if(data.statusCode === "200"){
              Swal.fire({
                icon: 'success',
                title: 'Congrats!',
                confirmButtonColor: '#D10024',
                confirmButtonText: 'Got It',
                text: 'Category Deleted!',
              })
              this.service.getAllProducts().subscribe( data => {
                this.categories = data.categories;
                
            })
            }
          })
      }
    })
  }

  formSubmit(categoryId:string){
    this.adminService.updateCategory(categoryId, this.categoryName)
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
            text: 'Category Updated!',
          })
          this.service.getAllProducts().subscribe( data => {
            this.categories = data.categories;
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

        
      })
  }

  addCategorySubmit(){
    console.log(this.newCategory);
    console.log("Inside Add");
    this.adminService.addCategory(this.newCategory.name, this.newCategory.imageUrl)
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
            text: 'Category Added!',
          })
          this.service.getAllProducts().subscribe( data => {
            this.categories = data.categories;
          });
          this.newCategory = {};
          this.addCategoryMode = false;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...!',
            confirmButtonColor: '#D10024',
            confirmButtonText: 'Got It',
            text: 'Please try again!',
          })
        }
      })
  }

  toggleAddCategoryMode(){
    this.addCategoryMode = !this.addCategoryMode;
  }

}
