import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  products: ProductModelServer[];
  categories: [];

  constructor(private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe( data => {
    this.products = data.data;
    this.categories = data.categories;
  });
  
  }

}
