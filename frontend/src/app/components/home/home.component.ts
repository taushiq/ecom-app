import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductService } from '../../services/product.service';
import { ProductModelServer } from '../../models/product.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[];
  categories: [];
  

  constructor(private service: ProductService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe( data => {
      this.products = data.data;
      this.categories = data.categories;
      
    })
  }

  selectProduct(id: number){
    this.router.navigate(['/product', id]);
  }

  updateCart(product: ProductModelServer, operation){
    //console.log('Update Product Cart from Home Component ', product, operation);
    this.cartService.updateCart(product.id, product, operation);
  }


}
